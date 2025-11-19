
import re
from playwright.sync_api import Page, expect, sync_playwright
import time

def add_players(page, players):
    for player in players:
        page.locator("#player-name-input").fill(player)
        page.locator("#add-player-btn").click()

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:8000")

    # --- Verification 1: Secret Screen ---
    page.locator("#go-to-setup-btn").click()
    page.locator("#mode-words").check() # Use words mode for logo check
    add_players(page, ["P1", "P2", "P3"])
    page.locator("#start-game-btn").click()

    # Get to the secret screen for the first player
    page.locator("#confirm-player-btn").click()
    page.locator("#reveal-secret-btn").click()

    expect(page.locator("#screen-secret")).to_be_visible()
    page.screenshot(path="final_secret_screen.png")

    # --- Verification 2: Exit button ---
    page.locator("#global-exit-btn").click()
    expect(page.locator("#screen-home")).to_be_visible()
    page.screenshot(path="final_exit_button_screen.png")

    # --- Verification 3: Voting Screen ---
    page.locator("#go-to-setup-btn").click()
    add_players(page, ["V1", "V2", "V3"])
    page.locator("#start-game-btn").click()

    # Reveal cards for all 3 players
    for i in range(3):
        page.locator("#confirm-player-btn").click()
        page.locator("#reveal-secret-btn").click()
        page.locator("#hide-secret-btn").click()

    page.locator("#start-vote-btn").click()
    expect(page.locator("#screen-secret-vote")).to_be_visible()
    page.screenshot(path="final_voting_screen.png")

    browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)
