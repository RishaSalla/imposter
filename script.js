import { questionSets, wordSets } from './gameData.js';

// ==========================================
// 1. نظام التشفير (Security & Hashing)
// ==========================================
async function hashCode(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ==========================================
// 2. نظام الذاكرة (Storage & Logic)
// ==========================================
const MODE = { QUESTIONS: 'questions', WORDS: 'words' };
const STORAGE_KEYS = {
  questions: 'risha_used_indices_questions_v2',
  words: 'risha_used_indices_words_v2'
};

function getUniqueContent(mode) {
  const bank = mode === MODE.QUESTIONS ? questionSets : wordSets;
  const storageKey = mode === MODE.QUESTIONS ? STORAGE_KEYS.questions : STORAGE_KEYS.words;
  
  let usedIndices = JSON.parse(localStorage.getItem(storageKey) || '[]');
  
  if (usedIndices.length >= bank.length) {
    usedIndices = [];
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * bank.length);
  } while (usedIndices.includes(randomIndex));

  usedIndices.push(randomIndex);
  localStorage.setItem(storageKey, JSON.stringify(usedIndices));

  return bank[randomIndex];
}

// ==========================================
// 3. حالة اللعبة (Game State)
// ==========================================
let gameState = {
  players: [],
  mode: MODE.QUESTIONS,
  currentSet: null,
  imposterIndex: -1,
  currentPlayerIndex: 0,
  currentVoteTally: {},
  currentVoterIndex: 0,
};

// ==========================================
// 4. عناصر الواجهة (DOM Elements)
// ==========================================
const $ = (id) => document.getElementById(id);
const screens = ['login', 'home', 'setup', 'pass', 'reveal-prompt', 'secret', 'discuss', 'secret-vote', 'result'];

const elements = {
  accessCodeInput: $('access-code-input'),
  loginBtn: $('login-btn'),
  loginError: $('login-error'),
  
  playerList: $('player-list'),
  playerNameInput: $('player-name-input'),
  addPlayerBtn: $('add-player-btn'),
  startGameBtn: $('start-game-btn'),
  playerCount: $('player-count'),
  goToSetupBtn: $('go-to-setup-btn'),

  passPlayerName: $('pass-player-name'),
  confirmPlayerBtn: $('confirm-player-btn'),
  
  revealPlayerName: $('reveal-player-name'),
  revealSecretBtn: $('reveal-secret-btn'),
  
  secretTitle: $('secret-title'),
  secretQuestionText: $('secret-question-text'),
  hideSecretBtn: $('hide-secret-btn'),
  
  discussP1: $('discuss-p1'),
  discussP2: $('discuss-p2'),
  startVoteBtn: $('start-vote-btn'),
  
  votePlayerName: $('vote-player-name'),
  voteGrid: $('vote-grid'),
  
  voteReveal: $('vote-reveal'),
  imposterReveal: $('imposter-reveal'),
  resultNormalQuestion: $('result-normal-question'),
  resultImposterQuestion: $('result-imposter-question'),
  resultNormalLabel: $('result-normal-label'),
  resultImposterLabel: $('result-imposter-label'),
  winnerReveal: $('winner-reveal'),
  
  newRoundBtn: $('new-round-btn'),
  playAgainBtn: $('play-again-btn'),
  globalExitBtn: $('global-exit-btn')
};

// ==========================================
// 5. التحكم بالشاشة (Navigation)
// ==========================================
function switchScreen(targetScreenId) {
  screens.forEach(id => {
    const el = $(`screen-${id}`);
    if (el) {
      el.classList.add('hidden');
      el.classList.remove('fade-in');
    }
  });

  const target = $(`screen-${targetScreenId}`);
  if (target) {
    target.classList.remove('hidden');
    requestAnimationFrame(() => target.classList.add('fade-in'));
  }
}

// ==========================================
// 6. منطق الدخول المحدث (Login Logic)
// ==========================================
async function handleLogin() {
  const inputCode = elements.accessCodeInput.value.trim();
  // ملاحظة: لا نحول الأحرف لكبيرة هنا لأن الهاش حساس للحالة (Case Sensitive)
  // إلا إذا كنت قد أنشأت الهاش من أحرف كبيرة، حينها استخدم .toUpperCase()
  // سأفترض أنك تريدها كما أدخلها المستخدم أو كما في نظامك. 
  // للأمان، سنجربها كما هي.
  
  if (!inputCode) return;

  try {
    const response = await fetch('./config.json');
    if (!response.ok) throw new Error("Config missing");
    const config = await response.json();
    
    // تشفير ما أدخله المستخدم
    const inputHash = await hashCode(inputCode);
    
    // التحقق من وجود الهاش في القائمة
    if (config.valid_hashes && config.valid_hashes.includes(inputHash)) {
      elements.loginError.classList.add('hidden');
      switchScreen('home');
    } else {
      elements.loginError.classList.remove('hidden');
      elements.accessCodeInput.value = '';
    }
  } catch (error) {
    console.error("Login Error:", error);
    elements.loginError.textContent = "خطأ في النظام.";
    elements.loginError.classList.remove('hidden');
  }
}

// ==========================================
// 7. إدارة اللعبة (Game Functions)
// ==========================================
function renderPlayerList() {
  elements.playerList.innerHTML = '';
  gameState.players.forEach((player, index) => {
    const div = document.createElement('div');
    div.className = 'flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100';
    div.innerHTML = `
      <span class="text-gray-800 font-medium">${index + 1}. ${player}</span>
      <button data-index="${index}" class="remove-player-btn text-rose-500 hover:text-rose-700">✕</button>
    `;
    elements.playerList.appendChild(div);
  });
  
  elements.playerCount.textContent = `${gameState.players.length} لاعب`;
  
  if (gameState.players.length >= 3) {
    elements.startGameBtn.disabled = false;
    elements.startGameBtn.classList.remove('bg-rose-400', 'opacity-70', 'cursor-not-allowed');
    elements.startGameBtn.classList.add('bg-rose-600', 'hover:bg-rose-700');
  } else {
    elements.startGameBtn.disabled = true;
    elements.startGameBtn.classList.add('bg-rose-400', 'opacity-70', 'cursor-not-allowed');
    elements.startGameBtn.classList.remove('bg-rose-600', 'hover:bg-rose-700');
  }
}

function addPlayer() {
  const name = elements.playerNameInput.value.trim();
  if (name && gameState.players.length < 20) {
    gameState.players.push(name);
    elements.playerNameInput.value = '';
    renderPlayerList();
    elements.playerNameInput.focus();
  }
}

function startGameSetup() {
  const modeRadios = document.querySelectorAll('input[name="mode"]');
  modeRadios.forEach(radio => {
    if (radio.checked) gameState.mode = radio.value;
  });
  startCoreGameLoop();
}

function startNewRound() {
  startCoreGameLoop();
}

function startCoreGameLoop() {
  if (gameState.players.length < 3) return;
  gameState.currentSet = getUniqueContent(gameState.mode);
  gameState.imposterIndex = Math.floor(Math.random() * gameState.players.length);
  gameState.currentPlayerIndex = 0;
  gameState.currentVoterIndex = 0;
  gameState.currentVoteTally = {};
  elements.globalExitBtn.classList.remove('hidden');
  showPassScreen();
}

function showPassScreen() {
  const playerName = gameState.players[gameState.currentPlayerIndex];
  elements.passPlayerName.textContent = playerName;
  switchScreen('pass');
}

function showRevealPromptScreen() {
  const playerName = gameState.players[gameState.currentPlayerIndex];
  elements.revealPlayerName.textContent = `دورك يا ${playerName}`;
  switchScreen('reveal-prompt');
}

function showSecretScreen() {
  const isImposter = (gameState.currentPlayerIndex === gameState.imposterIndex);
  elements.secretTitle.textContent = (gameState.mode === MODE.QUESTIONS) ? "السؤال السري:" : "الكلمة السرية:";
  elements.secretQuestionText.textContent = isImposter ? gameState.currentSet.imposter : gameState.currentSet.normal;
  switchScreen('secret');
}

function nextPlayerOrDiscuss() {
  gameState.currentPlayerIndex++;
  if (gameState.currentPlayerIndex < gameState.players.length) {
    showPassScreen();
  } else {
    showDiscussionScreen();
  }
}

function showDiscussionScreen() {
  elements.discussP1.textContent = (gameState.mode === MODE.QUESTIONS) ? "ناقشوا الإجابات!" : "تحدثوا عن الكلمة!";
  elements.discussP2.textContent = "المحتال يحاول الاندماج معكم.";
  switchScreen('discuss');
}

function showVotePassScreen() {
  if (gameState.currentVoterIndex >= gameState.players.length) {
    showResultScreen();
    return;
  }
  showSecretVoteScreen();
}

function showSecretVoteScreen() {
  const voterName = gameState.players[gameState.currentVoterIndex];
  elements.votePlayerName.textContent = `تصويت ${voterName}`;
  elements.voteGrid.innerHTML = '';
  gameState.players.forEach((player, index) => {
    if (index !== gameState.currentVoterIndex) {
      const btn = document.createElement('button');
      btn.className = 'vote-btn px-4 py-4 text-lg font-bold text-gray-800 bg-rose-50 border-2 border-rose-100 rounded-xl shadow-sm transition hover:bg-rose-500 hover:text-white hover:border-rose-500';
      btn.textContent = player;
      btn.onclick = () => handleVote(player);
      elements.voteGrid.appendChild(btn);
    }
  });
  switchScreen('secret-vote');
}

function handleVote(targetPlayerName) {
  gameState.currentVoteTally[targetPlayerName] = (gameState.currentVoteTally[targetPlayerName] || 0) + 1;
  gameState.currentVoterIndex++;
  if (gameState.currentVoterIndex < gameState.players.length) {
    showSecretVoteScreen();
  } else {
    showResultScreen();
  }
}

function showResultScreen() {
  let maxVotes = 0;
  let votedPlayer = null;
  let tie = false;
  for (const [player, votes] of Object.entries(gameState.currentVoteTally)) {
    if (votes > maxVotes) {
      maxVotes = votes;
      votedPlayer = player;
      tie = false;
    } else if (votes === maxVotes) {
      tie = true;
    }
  }
  const imposterName = gameState.players[gameState.imposterIndex];
  elements.voteReveal.textContent = votedPlayer ? `الشكوك تدور حول: ${votedPlayer} (${maxVotes} صوت)` : "لم يصوت أحد!";
  if (tie && maxVotes > 0) elements.voteReveal.textContent += " (تعادل!)";
  elements.imposterReveal.textContent = `المحتال الحقيقي: ${imposterName}`;
  elements.resultNormalLabel.textContent = gameState.mode === MODE.QUESTIONS ? "سؤال اللاعبين" : "كلمة اللاعبين";
  elements.resultNormalQuestion.textContent = gameState.currentSet.normal;
  elements.resultImposterLabel.textContent = gameState.mode === MODE.QUESTIONS ? "سؤال المحتال" : "كلمة المحتال";
  elements.resultImposterQuestion.textContent = gameState.currentSet.imposter;
  const imposterCaught = (votedPlayer === imposterName && !tie);
  if (imposterCaught) {
    elements.winnerReveal.textContent = "🎉 فاز اللاعبون!";
    elements.winnerReveal.className = "text-3xl font-black p-4 rounded-xl text-center bg-green-100 text-green-800 shadow-md transform rotate-1 border border-green-200";
  } else {
    elements.winnerReveal.textContent = "😈 فاز المحتال!";
    elements.winnerReveal.className = "text-3xl font-black p-4 rounded-xl text-center bg-rose-200 text-rose-900 shadow-md transform -rotate-1 border border-rose-300";
  }
  switchScreen('result');
}

// ==========================================
// 8. الأحداث (Event Listeners)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  elements.loginBtn.addEventListener('click', handleLogin);
  elements.accessCodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
  });
  elements.goToSetupBtn.addEventListener('click', () => switchScreen('setup'));
  elements.addPlayerBtn.addEventListener('click', addPlayer);
  elements.playerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addPlayer(); }
  });
  elements.playerList.addEventListener('click', (e) => {
    if (e.target.closest('.remove-player-btn')) {
      const idx = parseInt(e.target.closest('.remove-player-btn').dataset.index);
      gameState.players.splice(idx, 1);
      renderPlayerList();
    }
  });
  elements.startGameBtn.addEventListener('click', startGameSetup);
  elements.newRoundBtn.addEventListener('click', startNewRound);
  elements.confirmPlayerBtn.addEventListener('click', showRevealPromptScreen);
  elements.revealSecretBtn.addEventListener('click', showSecretScreen);
  elements.hideSecretBtn.addEventListener('click', nextPlayerOrDiscuss);
  elements.startVoteBtn.addEventListener('click', showVotePassScreen);
  
  function exitToMainMenu() {
    if(confirm("هل أنت متأكد من الخروج للقائمة الرئيسية؟")) {
      gameState.players = [];
      renderPlayerList();
      elements.globalExitBtn.classList.add('hidden');
      switchScreen('home');
    }
  }
  elements.playAgainBtn.addEventListener('click', exitToMainMenu);
  elements.globalExitBtn.addEventListener('click', exitToMainMenu);
  renderPlayerList();
});
