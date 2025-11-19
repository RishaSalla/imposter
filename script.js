// ---------- Banks (Expanded) ----------
// NOTE: تم التوسيع إلى 200 بطاقة "أسئلة" + توسيع كبير لبنك "كلمات".
// كل عنصر هو { normal, imposter } حيث يحصل المحتال على قيمة imposter.
const questionSets = [
  // 1–20: يوميات وحياة عامة
  { normal: "ما هو أفضل شيء تفعله في صباح العطلة؟", imposter: "ما هو أسوأ شيء تصحو عليه؟" },
  { normal: "شيء صغير يحسن مزاجك فورًا؟", imposter: "شيء بسيط يفسد يومك؟" },
  { normal: "أكثر تطبيق تستخدمه يوميًا؟", imposter: "تطبيق حذفته مؤخرًا؟" },
  { normal: "عادة صباحية لا تتخلى عنها؟", imposter: "عادة مسائية لا تحبها؟" },
  { normal: "كيف تحب قهوتك/شايك؟", imposter: "متى تتجنب الكافيين تمامًا؟" },
  { normal: "مكانك المفضل للجلوس في البيت؟", imposter: "مكان تتجنبه في البيت؟" },
  { normal: "أجمل منظر تراه من نافذتك؟", imposter: "شيء يزعجك خارج نافذتك؟" },
  { normal: "أول شيء تفعله عندما تتوتر؟", imposter: "أول شيء تفعله عندما تفرح كثيرًا؟" },
  { normal: "ماذا يعني لك يوم الجمعة؟", imposter: "أي يوم تراه الأصعب في الأسبوع؟" },
  { normal: "متى تشعر بأن وقتك يمر بسرعة؟", imposter: "متى تشعر بأن الوقت بطيء؟" },
  { normal: "شيء لا تفارقك محفظتك لأجله؟", imposter: "شيء دائمًا تنساه وأنت خارج؟" },
  { normal: "كيف تقاوم التسويف عادة؟", imposter: "متى تسمح لنفسك بالتسويف؟" },
  { normal: "أجمل هدية بسيطة تلقيتها؟", imposter: "هدية لم تستخدمها أبدًا؟" },
  { normal: "ماذا تفضّل: اتصال أم رسالة؟ ولماذا؟", imposter: "متى تتجاهل الاتصالات؟" },
  { normal: "شيء تتمنى لو تتقنه في تنظيم وقتك؟", imposter: "شيء تراه مضيعة للوقت؟" },
  { normal: "أفضل موسم في السنة بالنسبة لك؟", imposter: "أسوأ طقس مرّ عليك؟" },
  { normal: "لحظة يومية صغيرة تشعرك بالامتنان؟", imposter: "لحظة يومية تتمنى ألا تتكرر؟" },
  { normal: "ما الشيء الذي يزيد إنتاجيتك؟", imposter: "ما الذي يشتت تركيزك بسرعة؟" },
  { normal: "عادة صحية بدأت بها مؤخرًا؟", imposter: "عادة غير صحية تريد تركها؟" },
  { normal: "أفضل وقت للخروج من المنزل؟", imposter: "وقت تتفادى الخروج فيه؟" },
  // 21–40: طعام وشراب
  { normal: "طبق فطورك المثالي؟", imposter: "طبق فطور لا تفضله؟" },
  { normal: "مطعم محلي ترشحه للجميع؟", imposter: "مطعم جرّبته ولم تعد إليه؟" },
  { normal: "وجبة سريعة ضعيفة أمامها؟", imposter: "وجبة سريعة لا تغريك؟" },
  { normal: "نكهة آيس كريمك المفضلة؟", imposter: "نكهة لا تفهم شهرتها؟" },
  { normal: "أفضل مقبلات على المائدة؟", imposter: "مقبلات تستغني عنها دائمًا؟" },
  { normal: "قهوة أم شاي بعد الغداء؟", imposter: "عصير أم صودا في العزائم؟" },
  { normal: "بهار لا تستغني عنه؟", imposter: "مكوّن لا تستخدمه أبدًا؟" },
  { normal: "أكلة شارع تحبها؟", imposter: "أكلة شارع تتجنبها؟" },
  { normal: "حلوى عربية تعشقها؟", imposter: "حلوى تراها ثقيلة؟" },
  { normal: "طبق تطبخه بإتقان؟", imposter: "طبق حاولت ولم ينجح؟" },
  { normal: "أفضل مطبخ عالمي بالنسبة لك؟", imposter: "مطبخ عالمي لا يروق لك؟" },
  { normal: "فواكه موسمية تنتظرها؟", imposter: "فواكه لا تشتريها أبدًا؟" },
  { normal: "ماذا تضيف على السلطة؟", imposter: "ماذا تزيل من السلطة؟" },
  { normal: "ساندويتش أحلامك؟", imposter: "مكون يفسد الساندويتش؟" },
  { normal: "سناك مسائي خفيفك؟", imposter: "سناك تتجنبه ليلًا؟" },
  { normal: "طعام ترتبط رائحته بذكرى جميلة؟", imposter: "رائحة طعام لا تحتملها؟" },
  { normal: "كيف تحب طهي البيض؟", imposter: "كيف لا تحب طهي البيض؟" },
  { normal: "مشروب صيفي منعش؟", imposter: "مشروب شتوي مفضّل؟" },
  { normal: "أفضل طريقة لتقديم القهوة؟", imposter: "أسوأ قهوة تذوقتها؟" },
  { normal: "شيء تضيفه للبيتزا دائمًا؟", imposter: "شيء ترفضه على البيتزا؟" },
  // 41–60: سفر وأماكن
  { normal: "مدينة تتمشى فيها بلا خطة؟", imposter: "مدينة تزورها فقط للعمل؟" },
  { normal: "شاطئ أم جبل؟", imposter: "صحراء أم غابة؟" },
  { normal: "أجمل مشهد رأيته من طائرة؟", imposter: "موقف مزعج في مطار؟" },
  { normal: "وجهة قريبة تقترحها لعطلة قصيرة؟", imposter: "وجهة ازدحامها يزعجك؟" },
  { normal: "شيء لا تسافر بدونه؟", imposter: "شيء دائمًا تنساه في السفر؟" },
  { normal: "مدينة تحب مواصلاتها العامة؟", imposter: "مدينة تعبت فيها من الازدحام؟" },
  { normal: "حيّ/سوق شعبي أعجبك؟", imposter: "مكان سياحي مبالغ فيه؟" },
  { normal: "فندق أم شقة؟ ولماذا؟", imposter: "نوع سكن لا تفضله في السفر؟" },
  { normal: "أفضل تذكار جلبته؟", imposter: "تذكار ندمت على شرائه؟" },
  { normal: "نزهة مثالية داخل مدينتك؟", imposter: "مكان محلي لم يعجبك؟" },
  { normal: "أفضل تطبيقاتك في السفر؟", imposter: "ميزة لا تهتم بها أثناء السفر؟" },
  { normal: "مدينة تحب مطاعمها؟", imposter: "مدينة طعامها لم يناسبك؟" },
  { normal: "نشاط مغامرة جربته؟", imposter: "نشاط مغامرة لا تفكر به؟" },
  { normal: "طريق طويل لا تمل منه؟", imposter: "رحلة طويلة أنهكتك؟" },
  { normal: "أفضل وقت لزيارة الشاطئ؟", imposter: "وقت تتجنب فيه الشاطئ؟" },
  { normal: "حديقة/كورنيش تحبه؟", imposter: "مكان عام تتجنبه؟" },
  { normal: "هل تخطط بدقة أم تترك مساحة للعفوية؟", imposter: "متى تكره الخطة؟" },
  { normal: "متحف/معرض أثّر فيك؟", imposter: "متحف مللت منه؟" },
  { normal: "أفضل وسيلة نقل داخل المدينة؟", imposter: "وسيلة نقل تزعجك؟" },
  { normal: "رحلة تتمنى تكرارها؟", imposter: "رحلة لا تعيدها؟" },
  // 61–80: دراسة، عمل، مهارات
  { normal: "معلّم ألهمك؟", imposter: "درس لم تفهم جدواه؟" },
  { normal: "مهارة طورتها مؤخرًا؟", imposter: "مهارة توقفت عن تعلمها؟" },
  { normal: "أداة تزيد إنتاجيتك؟", imposter: "أداة تشتتك؟" },
  { normal: "أفضل طريقة لتدوين الملاحظات؟", imposter: "طريقة لم تنجح معك؟" },
  { normal: "نصيحة مهنية تلهمك؟", imposter: "نصيحة مهنية لم تنفعك؟" },
  { normal: "مشروع تفخر به؟", imposter: "مهمة لم تستمتع بها؟" },
  { normal: "وقت تفضله للتركيز؟", imposter: "وقت لا تنتج فيه؟" },
  { normal: "زميل أو فريق تتعلم منه؟", imposter: "عادة مكتبية تزعجك؟" },
  { normal: "طريقة للتغلب على التسويف في الدراسة؟", imposter: "شيء يجعلك تؤجل الدراسة؟" },
  { normal: "مساحة عمل مثالية بالنسبة لك؟", imposter: "تفصيلة مكتبية مزعجة؟" },
  { normal: "كتاب/دورة غيرت فهمك لمجال؟", imposter: "محتوى تعليمي مخادع؟" },
  { normal: "كيف تحتفل بإنهاء مهمة صعبة؟", imposter: "ماذا تفعل عندما تفشل مهمة؟" },
  { normal: "شيء تتمنى تعلمه من زميل؟", imposter: "شيء لا ترغب بتعلمه الآن؟" },
  { normal: "سؤال مقابلة عمل تحبه؟", imposter: "سؤال مقابلة تكرهه؟" },
  { normal: "ما الذي يجعلك تقول: هذا يوم عمل ناجح؟", imposter: "ما الذي يجعلك تقول: هذا يوم سيئ؟" },
  { normal: "هل تفضّل العمل من المنزل أم المكتب؟ ولماذا؟", imposter: "متى تكره العمل عن بُعد؟" },
  { normal: "عادة تساعدك قبل الاختبارات؟", imposter: "عادة تضرّك في أيام الاختبارات؟" },
  { normal: "أكثر أداة تعتمد عليها في مشروعك؟", imposter: "أداة توقفت عن استخدامها؟" },
  { normal: "كيف تعطي تغذية راجعة لطيفة؟", imposter: "متى تؤجل التغذية الراجعة؟" },
  { normal: "عادتك بعد إنجاز كبير؟", imposter: "عادتك بعد إخفاق؟" },
  // 81–100: ذكريات وطفولة
  { normal: "لعبة طفولة لا تُنسى؟", imposter: "لعبة لم تفهمها أبدًا؟" },
  { normal: "رائحة ترتبط ببيت العائلة؟", imposter: "رائحة لا تحبها في الحي؟" },
  { normal: "عادة قديمة بقيت معك؟", imposter: "عادة قديمة تركتها؟" },
  { normal: "أول رحلة مدرسية تتذكرها؟", imposter: "نشاط مدرسي لم تستمتع به؟" },
  { normal: "طبق عائلي يذكّرك بالمناسبات؟", imposter: "طبق طفولة لم يعجبك؟" },
  { normal: "صديق طفولة لازلت على تواصل معه؟", imposter: "عادة طفولية تخلّيت عنها؟" },
  { normal: "مكان كنتم تزورونه صغارًا؟", imposter: "مكان كانوا يأخذونك إليه ولا يعجبك؟" },
  { normal: "شيء تعلّمته من أحد كبار العائلة؟", imposter: "نصيحة لم تفهمها إلا متأخرًا؟" },
  { normal: "برنامج/كرتون طفولي مفضّل؟", imposter: "كرتون لم يلفت انتباهك؟" },
  { normal: "ذكرى عيد لا تُنسى؟", imposter: "ذكرى عيد لم تكن ممتعة؟" },
  { normal: "نشاط عائلي أسبوعي تحبه؟", imposter: "نشاط عائلي تتجنبه؟" },
  { normal: "أغنية قديمة تعود بك؟", imposter: "أغنية قديمة تجعلك تغيّر المحطة؟" },
  { normal: "أول جهاز امتلكته؟", imposter: "جهاز قديم لم تتعلق به؟" },
  { normal: "رياضة لعبتها صغارًا؟", imposter: "رياضة لم تكملها؟" },
  { normal: "حكاية كانوا يرددونها عليكم؟", imposter: "حكاية لم تكن تروق لك؟" },
  { normal: "معلّم ترك أثرًا طيبًا؟", imposter: "قانون مدرسي لم يعجبك؟" },
  { normal: "نزهة بسيطة كانت تسعدكم؟", imposter: "مشوار طويل كنتم تملّون منه؟" },
  { normal: "شيء قديم ورثته وتعتز به؟", imposter: "شيء قديم تخلّصت منه؟" },
  { normal: "عادة رمضانية أو عطلة محببة؟", imposter: "طقس احتفالي لا تحبه؟" },
  { normal: "لعبة لوحية/ورقية كنتم تلعبونها؟", imposter: "لعبة لوحية لم تعجبك؟" },
  // 101–120: هوايات وفنون
  { normal: "نوع موسيقى يريحك؟", imposter: "نوع موسيقى تتجنبه؟" },
  { normal: "فنان/فرقة تحبها؟", imposter: "أغنية شهيرة لا تستهويك؟" },
  { normal: "كتاب تقرأه هذه الأيام؟", imposter: "نوع كتب لا يجذبك؟" },
  { normal: "فيلم تراه أكثر من مرة؟", imposter: "نوع أفلام لا تكمله؟" },
  { normal: "هواية بسيطة تعطيك طاقة؟", imposter: "هواية جرّبتها ولم تكملها؟" },
  { normal: "عرض/مسرحية أثرت فيك؟", imposter: "عرض فني لم تفهمه؟" },
  { normal: "تطبيقاتك للموسيقى/البودكاست؟", imposter: "شيء يفسد عليك الاستماع؟" },
  { normal: "رسام/مصور تحب أعماله؟", imposter: "أسلوب فني لا تفضله؟" },
  { normal: "نشاط يدوي تستمتع به؟", imposter: "نشاط يدوي يزعجك؟" },
  { normal: "مهرجان/فعالية حضرتها وكانت رائعة؟", imposter: "فعالية حضرته وخيّبت ظنك؟" },
  { normal: "قناة/بودكاست ترشحه؟", imposter: "محتوى تراه مبالغًا فيه؟" },
  { normal: "صورة محفوظة تعني لك الكثير؟", imposter: "صورة قديمة تفضّل ألا تراها؟" },
  { normal: "لعبة فيديو ممتعة جربتها؟", imposter: "نوع ألعاب لا تحبه؟" },
  { normal: "أداة موسيقية تريد تعلمها؟", imposter: "أداة موسيقية لا تستهويك؟" },
  { normal: "لو ترسم الآن، ماذا سترسم؟", imposter: "لو تكتب الآن، ماذا لن تكتب؟" },
  // 121–140: تقنية وأدوات
  { normal: "أكثر ميزة هاتف تستخدمها؟", imposter: "ميزة لا تستخدمها أبدًا؟" },
  { normal: "اختصار/حيلة تقنية تعتمد عليها؟", imposter: "حيلة تقنية لم تنفعك؟" },
  { normal: "تطبيق إنتاجية تحبه؟", imposter: "تطبيق إنتاجية حذفته؟" },
  { normal: "جهاز منزلي ذكي مفيد؟", imposter: "جهاز منزلي لا فائدة له؟" },
  { normal: "كيف تنظّم صورك/ملفاتك؟", imposter: "شيء يبعثر ملفاتك؟" },
  { normal: "تابلت أم لابتوب للقراءة؟", imposter: "ورق أم شاشة للدراسة؟" },
  { normal: "إشعار تفرحه رؤيته؟", imposter: "إشعار يزعجك دائمًا؟" },
  { normal: "خلفية شاشة مفضلة؟", imposter: "نغمة رنين تكرهها؟" },
  { normal: "بطارية: كيف تديرها يومك؟", imposter: "متى نفدت وأحرجتك؟" },
  { normal: "إعداد خصوصية تهتم به؟", imposter: "إعداد لا تعبث به أبدًا؟" },
  { normal: "أداة عمل سحابي تحبها؟", imposter: "أداة سحابية لا تثق بها؟" },
  { normal: "اختصار لوحة مفاتيح تنقذك؟", imposter: "اختصار لم تحفظه بعد؟" },
  { normal: "ميزة كاميرا تعتمد عليها؟", imposter: "وضع تصوير لا تستخدمه؟" },
  { normal: "شيء تطوّرت به تقنيًا مؤخرًا؟", imposter: "شيء تقني لم تفهمه بعد؟" },
  { normal: "تطبيق خريطة/تنقل مفضل؟", imposter: "ميزة خرائط لا تهمك؟" },
  // 141–160: بيت وروتين ونمط حياة
  { normal: "زاوية صغيرة في بيتك تحبها؟", imposter: "زاوية لا ترتاح فيها؟" },
  { normal: "نبتة منزلية مفضلة؟", imposter: "نبتة لا تنجح معك؟" },
  { normal: "عطرك اليومي؟", imposter: "رائحة منزلية لا تحبها؟" },
  { normal: "جدول نوم يساعدك؟", imposter: "عادة ليلية تؤخر نومك؟" },
  { normal: "طريقتك في ترتيب المكتب؟", imposter: "فوضى لا تتحملها؟" },
  { normal: "أداة مطبخ لا تُستغنى؟", imposter: "أداة مطبخ نادرًا ما تستخدمها؟" },
  { normal: "روتين تنظيف سريعك؟", imposter: "مهمة منزلية تؤجلها؟" },
  { normal: "مساحة هادئة تقرأ فيها؟", imposter: "مكان صاخب تتجنبه؟" },
  { normal: "جلسة شاي/قهوة مثالية؟", imposter: "جلسة لا تروق لك؟" },
  { normal: "عادة صحية صغيرة في البيت؟", imposter: "عادة بيتية تريد إيقافها؟" },
  { normal: "شيء تحبه في جيرانك؟", imposter: "شيء يزعجك في الجيرة؟" },
  { normal: "وقت مفضل للطبخ؟", imposter: "وقت لا تطبخ فيه أبدًا؟" },
  { normal: "زاوية للعمل عن بعد تعجبك؟", imposter: "شيء يفسد عليك العمل من البيت؟" },
  { normal: "شيء بسيط يجعل البيت أدفأ؟", imposter: "شيء يجعل البيت أقل راحة؟" },
  { normal: "عادة ضيافة محلية تحبها؟", imposter: "تصرف ضيافة لا تحبه؟" },
  // 161–180: طبيعة، فصول، صحة
  { normal: "مطر أم شمس؟", imposter: "ثلج أم ضباب؟" },
  { normal: "مكان خارجي ينعشك؟", imposter: "مكان خارجي يرهقك؟" },
  { normal: "رياضة خفيفة في الهواء الطلق؟", imposter: "نشاط خارجي لا يناسبك؟" },
  { normal: "فصل ترتبط به ذكريات جميلة؟", imposter: "فصل تجد التأقلم معه صعبًا؟" },
  { normal: "طعام صحي تحبه فعلًا؟", imposter: "طعام صحي لا تفضله؟" },
  { normal: "عادة حركة بسيطة تعتمدها يوميًا؟", imposter: "عادة سلبية تحاول تقليلها؟" },
  { normal: "مشروب دافئ شتوي؟", imposter: "مشروب بارد لا تشتهيه؟" },
  { normal: "نزهة مسائية منعشة؟", imposter: "وقت خارجي تتجنبه؟" },
  { normal: "منظر طبيعي يهدّئك؟", imposter: "ظرف جوي يزعجك؟" },
  { normal: "نشاط عافية تحبه؟", imposter: "صيحة عافية لا تقنعك؟" },
  { normal: "أغنية/دعاء تسمعه في الطريق؟", imposter: "صوت خارجي يزعجك؟" },
  { normal: "مكان للجلوس قرب الماء؟", imposter: "مكان قرب الماء لا تحبه؟" },
  { normal: "عادة نوم جيدة تتبعها؟", imposter: "عادة نوم سيئة تحاول تغييرها؟" },
  { normal: "وقت مثالي للمشي؟", imposter: "وقت لا تمشي فيه أبدًا؟" },
  { normal: "إفطار صحي تحبه؟", imposter: "وجبة صحية لا تجدها شهية؟" },
  // 181–200: افتراضات ومواقف اجتماعية
  { normal: "لو تهدي نصيحة لعُمر أصغر منك؟", imposter: "نصيحة شعبية لا تؤمن بها؟" },
  { normal: "متى تقول: أنا فخور بنفسي؟", imposter: "متى تقول: كنت أستطيع أفضل؟" },
  { normal: "موقف محرج تتجاوزه بسرعة كيف؟", imposter: "موقف تظل تفكر فيه طويلًا؟" },
  { normal: "طريقة لطيفة للاعتذار؟", imposter: "طريقة اعتذار لا تعجبك؟" },
  { normal: "متى تمنح مجاملة لشخص غريب؟", imposter: "متى تتجنب التعليق تمامًا؟" },
  { normal: "سؤال تفتحه للتعارف؟", imposter: "سؤال تتجنب طرحه؟" },
  { normal: "كيف تقول لا بلطف؟", imposter: "متى توافق مجاملة وأنت لا تريد؟" },
  { normal: "كيف تشجع صديقًا محبطًا؟", imposter: "ما الذي لا يجب قوله لصديق محبط؟" },
  { normal: "قرار صغير غيّر يومك للأفضل؟", imposter: "قرار صغير ندمت عليه؟" },
  { normal: "عادة امتنان تمارسها؟", imposter: "عادة سلبية تريد استبدالها؟" },
  { normal: "شيء تفعله لتلطيف أجواء اجتماع؟", imposter: "تصرف يُثقل الاجتماع؟" },
  { normal: "هدية رمزية تحب إهداءها؟", imposter: "هدية رمزية لا تراها مناسبة؟" },
  { normal: "كيف تختار فيلمًا جماعيًا؟", imposter: "متى تتركهم يختارون دونك؟" },
  { normal: "نشاط جماعي ممتع داخل البيت؟", imposter: "نشاط جماعي لا تحبه؟" },
  { normal: "قاعدة ذهبية في الحوار؟", imposter: "قاعدة يسيء الناس فهمها؟" },
  { normal: "لو تخطط لقاءً مفاجئًا لطيفًا؟", imposter: "لو ألغيت لقاءً في آخر لحظة، ماذا تفعل؟" },
  { normal: "شيء صغير تقدّره في أصدقائك؟", imposter: "تصرف يزعجك من الأصدقاء؟" },
  { normal: "متى تقول: خلّها على الله وتضحك؟", imposter: "متى تأخذ الأمور بجدية زائدة؟" },
  { normal: "كيف تودّع ضيفًا بلطف؟", imposter: "ما الذي يفسد الزيارة؟" },
  { normal: "ما الذي يجعلك تشعر بالانتماء؟", imposter: "ما الذي يجعلك تشعر بالغربة؟" }
];

const wordSets = [
  // أطعمة ومشروبات
  { normal: "تفاح", imposter: "-" },
  { normal: "موز", imposter: "-" },
  { normal: "عنب", imposter: "-" },
  { normal: "بطيخ", imposter: "-" },
  { normal: "رمان", imposter: "-" },
  { normal: "قهوة", imposter: "-" },
  { normal: "نسكافيه", imposter: "-" },
  { normal: "حليب", imposter: "-" },
  { normal: "عصير", imposter: "-" },
  { normal: "ماء", imposter: "-" },
  { normal: "خبز", imposter: "-" },
  { normal: "سمبوسة", imposter: "-" },
  { normal: "كبسة", imposter: "-" },
  { normal: "ملح", imposter: "-" },
  { normal: "فلفل", imposter: "-" },
  { normal: "زيتون", imposter: "-" },
  { normal: "أرز", imposter: "-" },
  { normal: "بيتزا", imposter: "-" },
  { normal: "حمص", imposter: "-" },
  { normal: "تبولة", imposter: "-" },
  { normal: "شاورما", imposter: "-" },
  { normal: "كباب", imposter: "-" },
  { normal: "عدس", imposter: "-" },
  { normal: "لبنة", imposter: "-" },
  { normal: "زبدة", imposter: "-" },
  // أماكن ومواصلات
  { normal: "مطار", imposter: "-" },
  { normal: "ميناء", imposter: "-" },
  { normal: "متحف", imposter: "-" },
  { normal: "حديقة", imposter: "-" },
  { normal: "شاطئ", imposter: "-" },
  { normal: "فندق", imposter: "-" },
  { normal: "بيت", imposter: "-" },
  { normal: "سوق", imposter: "-" },
  { normal: "جامع", imposter: "-" },
  { normal: "مدرسة", imposter: "-" },
  { normal: "مقهى", imposter: "-" },
  { normal: "حديقة حيوانات", imposter: "-" },
  { normal: "سيارة", imposter: "-" },
  { normal: "دراجة", imposter: "-" },
  { normal: "قطار", imposter: "-" },
  { normal: "تاكسي", imposter: "-" },
  // أشياء وأدوات
  { normal: "مفتاح", imposter: "-" },
  { normal: "هاتف", imposter: "-" },
  { normal: "كتاب", imposter: "-" },
  { normal: "قلم", imposter: "-" },
  { normal: "كرسي", imposter: "-" },
  { normal: "مرآة", imposter: "-" },
  { normal: "ساعة", imposter: "-" },
  { normal: "حقيبة", imposter: "-" },
  { normal: "سماعات", imposter: "-" },
  { normal: "لوح مفاتيح", imposter: "-" },
  { normal: "مصباح", imposter: "-" },
  { normal: "مظلة", imposter: "-" },
  { normal: "بطارية", imposter: "-" },
  { normal: "مقعد", imposter: "-" },
  { normal: "صحن", imposter: "-" },
  { normal: "سكين", imposter: "-" },
  { normal: "مكواة", imposter: "-" },
  { normal: "خريطة", imposter: "-" },
  // طبيعة وحيوانات
  { normal: "قط", imposter: "-" },
  { normal: "عصفور", imposter: "-" },
  { normal: "نخلة", imposter: "-" },
  { normal: "ورد", imposter: "-" },
  { normal: "قمر", imposter: "-" },
  { normal: "مطر", imposter: "-" },
  { normal: "جبال", imposter: "-" },
  { normal: "بحر", imposter: "-" },
  { normal: "غابة", imposter: "-" },
  { normal: "شلال", imposter: "-" },
  { normal: "صخر", imposter: "-" },
  { normal: "مرجان", imposter: "-" },
  // ألوان ومشاعر
  { normal: "أخضر", imposter: "-" },
  { normal: "أبيض", imposter: "-" },
  { normal: "أحمر", imposter: "-" },
  { normal: "بنفسجي", imposter: "-" },
  { normal: "رمادي", imposter: "-" },
  { normal: "سعيد", imposter: "-" },
  { normal: "هادئ", imposter: "-" },
  { normal: "حماسي", imposter: "-" },
  { normal: "شجاع", imposter: "-" },
  { normal: "مرتاح", imposter: "-" },
  // مهن وأفعال
  { normal: "طبيب", imposter: "-" },
  { normal: "معلم", imposter: "-" },
  { normal: "مهندس", imposter: "-" },
  { normal: "محاسب", imposter: "-" },
  { normal: "مصمم", imposter: "-" },
  { normal: "كاتب", imposter: "-" },
  { normal: "مخرج", imposter: "-" },
  { normal: "يعزف", imposter: "-" },
  { normal: "يكتب", imposter: "-" },
  { normal: "يعدّ", imposter: "-" },
  { normal: "يفحص", imposter: "-" },
  // متفرقات
  { normal: "إنترنت", imposter: "-" },
  { normal: "بريد", imposter: "-" },
  { normal: "كلمة سر", imposter: "-" },
  { normal: "كرة قدم", imposter: "-" },
  { normal: "تنس", imposter: "-" },
  { normal: "سباق", imposter: "-" },
  { normal: "صباح", imposter: "-" },
  { normal: "شتاء", imposter: "-" },
  { normal: "هدية", imposter: "-" },
  { normal: "سر", imposter: "-" },
  { normal: "محادثة", imposter: "-" },
  { normal: "حفل", imposter: "-" },
  { normal: "تذكرة", imposter: "-" },
  { normal: "رمز", imposter: "-" },
  { normal: "سحابة", imposter: "-" },
  { normal: "قنديل", imposter: "-" },
  { normal: "نافذة", imposter: "-" },
  { normal: "باب", imposter: "-" },
  { normal: "حد", imposter: "-" }
];


// ---------- No-repeat helpers with localStorage ----------
const MODE = { QUESTIONS: 'questions', WORDS: 'words' };

const BANK_VERSION = 'v1.0.0';
const STORAGE_KEYS = {
  version: 'hideseek_bank_version',
  q: 'hideseek_used_questions_v1',
  w: 'hideseek_used_words_v1'
};

// Ensure version; if changed, clear previous used indices
try {
  const ver = localStorage.getItem(STORAGE_KEYS.version);
  if (ver !== BANK_VERSION) {
    localStorage.removeItem(STORAGE_KEYS.q);
    localStorage.removeItem(STORAGE_KEYS.w);
    localStorage.setItem(STORAGE_KEYS.version, BANK_VERSION);
  }
} catch (_) {}

function getUsedSetLS(mode) {
  const key = mode === MODE.QUESTIONS ? STORAGE_KEYS.q : STORAGE_KEYS.w;
  try {
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    return new Set(Array.isArray(arr) ? arr : []);
  } catch (_) {
    return new Set();
  }
}

function saveUsedSetLS(mode, set) {
  const key = mode === MODE.QUESTIONS ? STORAGE_KEYS.q : STORAGE_KEYS.w;
  try { localStorage.setItem(key, JSON.stringify([...set])); } catch (_) {}
}

function pickUniquePairLS(mode) {
  const bank = mode === MODE.QUESTIONS ? questionSets : wordSets;
  let used = getUsedSetLS(mode);

  // If exhausted, reset the cycle (but keep the other bank)
  if (used.size >= bank.length) {
    used = new Set();
  }

  let index;
  // Pick a random unique index
  do {
    index = Math.floor(Math.random() * bank.length);
  } while (used.has(index));

  used.add(index);
  saveUsedSetLS(mode, used);

  return bank[index];
}

// Global game state
let gameState = {
  players: [],
  mode: MODE.QUESTIONS,
  currentSet: null,
  imposterIndex: -1,
  currentPlayerIndex: 0,
  currentVoteTally: {},
  currentVoterIndex: 0,
};

// DOM elements
const $ = (selector) => document.getElementById(selector);
const screens = ['home', 'setup', 'pass', 'reveal-prompt', 'secret', 'discuss', 'secret-vote', 'result'];

const elements = {
  playerList: $('player-list'),
  playerNameInput: $('player-name-input'),
  addPlayerBtn: $('add-player-btn'),
  startGameBtn: $('start-game-btn'),
  playerCount: $('player-count'),

  passPlayerName: $('pass-player-name'),
  confirmPlayerBtn: $('confirm-player-btn'),

  revealPlayerName: $('reveal-player-name'),
  revealSecretBtn: $('reveal-secret-btn'),

  secretTitle: $('secret-title'),
  secretQuestionText: $('secret-question-text'),
  hideSecretBtn: $('hide-secret-btn'),

  discussTitle: $('discuss-title'),
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
  playAgainBtn: $('play-again-btn'),
  globalExitBtn: $('global-exit-btn'),
};

// Utility to switch screens
function switchScreen(targetScreenId) {
  screens.forEach(screenId => {
    const screenElement = $(`screen-${screenId}`);
    if (screenElement) {
      screenElement.classList.add('hidden');
      screenElement.classList.remove('fade-in');
    }
  });

  const targetScreen = $(`screen-${targetScreenId}`);
  if (targetScreen) {
    targetScreen.classList.remove('hidden');
    // Ensure fade-in is applied after display: none is removed
    requestAnimationFrame(() => targetScreen.classList.add('fade-in'));
  }
}

// Player management
function renderPlayerList() {
  elements.playerList.innerHTML = '';
  gameState.players.forEach((player, index) => {
    const playerEl = document.createElement('div');
    playerEl.className = 'flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100';
    playerEl.innerHTML = `
      <span class="text-gray-800 font-medium">${player}</span>
      <button data-index="${index}" class="remove-player-btn text-rose-500 hover:text-rose-700 p-1 rounded-full transition-colors" aria-label="حذف اللاعب">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 6h6v10H7V6z" clip-rule="evenodd" />
        </svg>
      </button>
    `;
    elements.playerList.appendChild(playerEl);
  });

  elements.playerCount.textContent = `${gameState.players.length} لاعب`;
  updateStartButtonState();
}

function updateStartButtonState() {
  const count = gameState.players.length;
  const isReady = count >= 3;
  elements.startGameBtn.disabled = !isReady;

  if (isReady) {
    elements.startGameBtn.classList.remove('bg-rose-400', 'opacity-70', 'cursor-not-allowed');
    elements.startGameBtn.classList.add('bg-rose-600', 'hover:bg-rose-700');
  } else {
    elements.startGameBtn.classList.add('bg-rose-400', 'opacity-70', 'cursor-not-allowed');
    elements.startGameBtn.classList.remove('bg-rose-600', 'hover:bg-rose-700');
  }
}

function addPlayer() {
  const name = elements.playerNameInput.value.trim();
  if (name && gameState.players.length < 10) { // Limit to 10 players
    gameState.players.push(name);
    elements.playerNameInput.value = '';
    renderPlayerList();
    elements.playerNameInput.focus();
  }
}

function handleRemovePlayer(event) {
  if (event.target.closest('.remove-player-btn')) {
    const index = parseInt(event.target.closest('.remove-player-btn').dataset.index);
    gameState.players.splice(index, 1);
    renderPlayerList();
  }
}

function resetGame() {
  gameState.currentVoteTally = {};
  gameState.currentPlayerIndex = 0;
  gameState.currentVoterIndex = 0;
  // Keep players and mode for quick replay
}

function startGame() {
  if (gameState.players.length < 3) return;

  resetGame();

  const modeRadios = document.querySelectorAll('input[name="mode"]');
  modeRadios.forEach(radio => {
    if (radio.checked) {
      gameState.mode = radio.value;
    }
  });

  // 1. Pick the content
  gameState.currentSet = pickUniquePairLS(gameState.mode);

  // 2. Pick the Imposter
  gameState.imposterIndex = Math.floor(Math.random() * gameState.players.length);

  // 3. Start the passing phase
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
  elements.revealPlayerName.textContent = `دورك يا ${playerName}!`;
  switchScreen('reveal-prompt');
}

function showSecretScreen() {
  const playerName = gameState.players[gameState.currentPlayerIndex];
  const isImposter = gameState.currentPlayerIndex === gameState.imposterIndex;

  if (gameState.mode === MODE.QUESTIONS) {
    // Blind Imposter Mode: Title is always the same.
    elements.secretTitle.textContent = "السؤال السري:";
    if (isImposter) {
      elements.secretQuestionText.textContent = gameState.currentSet.imposter;
    } else {
      elements.secretQuestionText.textContent = gameState.currentSet.normal;
    }
    // Remove revealing colors for this mode to ensure imposter is blind
    elements.secretTitle.classList.remove('text-rose-400', 'text-green-400');

  } else if (gameState.mode === MODE.WORDS) {
    // Logic corrected for Word Mode: Imposter knows they are imposter, but NOT the word
    elements.secretTitle.textContent = "الكلمة السرية:";
    if (isImposter) {
      elements.secretQuestionText.innerHTML = '<img src="/assets/images/logo.png" alt="Logo" class="w-24 h-24 mx-auto opacity-50">';
    } else {
      elements.secretQuestionText.textContent = gameState.currentSet.normal;
    }
    // Set colors for words mode (same as questions for style)
    elements.secretTitle.classList.toggle('text-rose-400', isImposter);
    elements.secretTitle.classList.toggle('text-green-400', !isImposter);
  }

  switchScreen('secret');
}

function nextPlayerOrDiscuss() {
  gameState.currentPlayerIndex++;
  if (gameState.currentPlayerIndex < gameState.players.length) {
    // Next player needs to see their card
    showPassScreen();
  } else {
    // All players have seen their cards, start discussion
    showDiscussionScreen();
  }
}

function showDiscussionScreen() {
  elements.discussTitle.textContent = "حان وقت النقاش!";
  elements.discussP1.textContent = (gameState.mode === MODE.QUESTIONS)
    ? "اطرحوا أسئلة على بعضكم البعض حول سؤالكم السري لكشف المحتال."
    : "ناقشوا حول كلمتكم السرية (دون قولها) لكشف المحتال.";
  elements.discussP2.textContent = "انتبهوا، المحتال لا يعرف الكلمة/السؤال العادي وسيحاول التظاهر بأنه يعرفه.";

  switchScreen('discuss');
}

function showVotePassScreen() {
  showSecretVoteScreen();
}

function showSecretVoteScreen() {
  if (gameState.currentVoterIndex >= gameState.players.length) {
    // Voting is complete, show results
    showResultScreen();
    return;
  }

  const voterName = gameState.players[gameState.currentVoterIndex];
  elements.votePlayerName.textContent = `دور ${voterName} في التصويت...`;
  elements.voteGrid.innerHTML = '';

  gameState.players.forEach((player, index) => {
    if (index !== gameState.currentVoterIndex) { // Can't vote for self
      const voteButton = document.createElement('button');
      voteButton.className = 'vote-btn px-4 py-3 text-lg font-bold text-gray-800 bg-white rounded-xl shadow-md transition hover:bg-rose-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-rose-300';
      voteButton.textContent = player;
      voteButton.dataset.targetIndex = index;
      elements.voteGrid.appendChild(voteButton);
    }
  });

  switchScreen('secret-vote');
}

function handleVote(targetIndex) {
  const targetPlayer = gameState.players[targetIndex];

  // Record the vote
  gameState.currentVoteTally[targetPlayer] = (gameState.currentVoteTally[targetPlayer] || 0) + 1;

  // Move to next voter
  gameState.currentVoterIndex++;

  // If there are more voters, show the next voting screen. Otherwise, show results.
  if (gameState.currentVoterIndex < gameState.players.length) {
    showSecretVoteScreen();
  } else {
    showResultScreen();
  }
}

function showResultScreen() {
  // 1. Determine most voted player
  let maxVotes = 0;
  let votedPlayer = null;
  let tie = false;

  for (const player in gameState.currentVoteTally) {
    const votes = gameState.currentVoteTally[player];
    if (votes > maxVotes) {
      maxVotes = votes;
      votedPlayer = player;
      tie = false;
    } else if (votes === maxVotes) {
      tie = true;
    }
  }

  const imposterName = gameState.players[gameState.imposterIndex];

  // 2. Show vote tally
  let tallyText = '';
  const sortedVotes = Object.entries(gameState.currentVoteTally).sort(([, a], [, b]) => b - a);
  sortedVotes.forEach(([player, votes]) => {
    tallyText += `${player}: ${votes} صوت. `;
  });

  elements.voteReveal.textContent = `نتيجة التصويت: ${tallyText}`;

  // 3. Show Imposter identity
  elements.imposterReveal.textContent = `المحتال هو: ${imposterName}`;
  elements.imposterReveal.classList.add('text-rose-600');
  elements.imposterReveal.classList.remove('text-green-700');

  // 4. Show the secret questions/words
  elements.resultNormalQuestion.textContent = gameState.currentSet.normal;
  elements.resultImposterQuestion.textContent = gameState.currentSet.imposter;
  elements.resultNormalLabel.textContent = (gameState.mode === MODE.QUESTIONS) ? 'سؤال اللاعبين:' : 'كلمة اللاعبين:';

  // Use custom label for imposter's card based on mode
  if (gameState.mode === MODE.WORDS) {
    elements.resultImposterLabel.textContent = 'ما رآه المحتال:';
    elements.resultImposterQuestion.textContent = '— لا كلمة سر —';
  } else {
    elements.resultImposterLabel.textContent = 'سؤال المحتال:';
    elements.resultImposterQuestion.textContent = gameState.currentSet.imposter;
  }


  // 5. Determine Winner
  let winnerText = '';
  let winnerClass = '';

  const imposterVotedOut = (votedPlayer === imposterName) && !tie;
  const imposterEscaped = (votedPlayer !== imposterName) || tie;

  if (imposterVotedOut) {
    winnerText = `فاز اللاعبون! تم كشف المحتال بنجاح.`;
    winnerClass = 'bg-green-100 text-green-800';
  } else if (imposterEscaped) {
    winnerText = `فاز المحتال! لم يتم كشفه.`;
    winnerClass = 'bg-rose-100 text-rose-800';
  } else {
    // Should not happen, but for safety
    winnerText = `انتهت اللعبة بالتعادل.`;
    winnerClass = 'bg-amber-100 text-amber-800';
  }

  elements.winnerReveal.textContent = winnerText;
  elements.winnerReveal.className = `text-4xl font-black p-4 rounded-xl ${winnerClass}`;

  switchScreen('result');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Setup Screen Listeners
  elements.addPlayerBtn.addEventListener('click', addPlayer);
  elements.playerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      addPlayer();
    }
  });
  elements.playerList.addEventListener('click', handleRemovePlayer);

  elements.startGameBtn.addEventListener('click', startGame);

  $('go-to-setup-btn').addEventListener('click', () => switchScreen('setup'));

  // Pass Screen Listeners
  elements.confirmPlayerBtn.addEventListener('click', () => {
    // After a player confirms, always show the reveal prompt for their secret card
    showRevealPromptScreen();
  });

  // Reveal Prompt Listeners
  elements.revealSecretBtn.addEventListener('click', showSecretScreen);

  // Secret Card Listeners
  elements.hideSecretBtn.addEventListener('click', nextPlayerOrDiscuss);

  // Discussion Listeners
  elements.startVoteBtn.addEventListener('click', showVotePassScreen);

  // Secret Vote Listeners
  elements.voteGrid.addEventListener('click', (event) => {
    const button = event.target.closest('.vote-btn');
    if (button) {
      const targetIndex = parseInt(button.dataset.targetIndex);
      handleVote(targetIndex);
    }
  });

  // Result Listeners
  elements.playAgainBtn.addEventListener('click', () => {
    gameState.players = [];
    renderPlayerList();
    switchScreen('home');
  });

  // Initial render
  renderPlayerList();
  switchScreen('home');

  // Global Exit button logic
  function resetAndGoHome() {
    gameState.players = [];
    renderPlayerList();
    elements.globalExitBtn.classList.add('hidden');
    switchScreen('home');
  }
  elements.globalExitBtn.addEventListener('click', resetAndGoHome);
});
