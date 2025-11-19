
import re
from playwright.sync_api import Page, expect, sync_playwright
import time

def add_players(page, players):
    for player in players:
        page.locator("#player-name-input").fill(player)
        page.locator("#add-player-btn").click()

def run_test_suite(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:8000")

    print("--- Starting Test Suite ---")

    # Test 1: Full Voting Flow
    print("Running Test 1: Full Voting Flow...")
    try:
        expect(page.locator("#screen-home")).to_be_visible()
        page.locator("#go-to-setup-btn").click()

        expect(page.locator("#screen-setup")).to_be_visible()
        add_players(page, ["Player1", "Player2", "Player3"])
        page.locator("#start-game-btn").click()

        # Reveal cards for all 3 players
        for i in range(3):
            expect(page.locator("#screen-pass")).to_be_visible(timeout=5000)
            page.locator("#confirm-player-btn").click()
            expect(page.locator("#screen-reveal-prompt")).to_be_visible()
            page.locator("#reveal-secret-btn").click()
            expect(page.locator("#screen-secret")).to_be_visible()
            page.locator("#hide-secret-btn").click()

        # Discussion and start vote
        expect(page.locator("#screen-discuss")).to_be_visible(timeout=5000)
        page.locator("#start-vote-btn").click()

        # --- Voting Loop ---
        # Voter 1 votes for Player 2
        expect(page.locator("#vote-player-name")).to_contain_text("Player1")
        page.locator('.vote-btn:has-text("Player2")').click()

        # Voter 2 votes for Player 3
        expect(page.locator("#vote-player-name")).to_contain_text("Player2")
        page.locator('.vote-btn:has-text("Player3")').click()

        # Voter 3 votes for Player 1
        expect(page.locator("#vote-player-name")).to_contain_text("Player3")
        page.locator('.vote-btn:has-text("Player1")').click()

        # Check for result screen
        expect(page.locator("#screen-result")).to_be_visible(timeout=5000)
        print("Test 1 PASSED: Voting flow completed successfully.")

        # Reset for next test
        page.locator("#play-again-btn").click()
        expect(page.locator("#screen-home")).to_be_visible()

    except Exception as e:
        print(f"Test 1 FAILED: {e}")
        page.screenshot(path="voting_test_failure.png")


    # Test 2: Global Exit Button
    print("\nRunning Test 2: Global Exit Button...")
    try:
        page.locator("#go-to-setup-btn").click()
        add_players(page, ["PlayerA", "PlayerB", "PlayerC"])
        page.locator("#start-game-btn").click()

        expect(page.locator("#screen-pass")).to_be_visible()
        exit_btn = page.locator("#global-exit-btn")
        expect(exit_btn).to_be_visible()

        exit_btn.click()

        expect(page.locator("#screen-home")).to_be_visible()
        expect(page.locator("#player-list")).to_be_empty()
        expect(exit_btn).to_be_hidden()
        print("Test 2 PASSED: Global exit button works as expected.")

    except Exception as e:
        print(f"Test 2 FAILED: {e}")
        page.screenshot(path="exit_button_test_failure.png")


    # Test 3: Blind Imposter in Questions Mode
    print("\nRunning Test 3: Blind Imposter Mode...")
    try:
        page.locator("#go-to-setup-btn").click()
        page.locator("#mode-questions").check() # Ensure questions mode is selected
        add_players(page, ["Q_Player1", "Q_Player2", "Q_Player3"])
        page.locator("#start-game-btn").click()

        expect(page.locator("#screen-pass")).to_be_visible()
        page.locator("#confirm-player-btn").click()
        expect(page.locator("#screen-reveal-prompt")).to_be_visible()
        page.locator("#reveal-secret-btn").click()

        expect(page.locator("#screen-secret")).to_be_visible()
        secret_title = page.locator("#secret-title")
        expect(secret_title).to_have_text("السؤال السري:") # Key check for blind mode

        print("Test 3 PASSED: Blind imposter mode is working correctly.")

        # Cleanup
        page.locator("#global-exit-btn").click()

    except Exception as e:
        print(f"Test 3 FAILED: {e}")
        page.screenshot(path="blind_imposter_test_failure.png")


    print("\n--- Test Suite Finished ---")
    browser.close()

with sync_playwright() as playwright:
    run_test_suite(playwright)
