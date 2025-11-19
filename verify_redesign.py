
import re
from playwright.sync_api import Page, expect, sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:8000")

    # Expect the home screen to be visible
    expect(page.locator("#screen-home")).to_be_visible()

    # Click the button to go to the setup screen
    page.locator("#go-to-setup-btn").click()

    # Expect the setup screen to be visible after a short wait
    setup_screen = page.locator("#screen-setup")
    expect(setup_screen).to_be_visible(timeout=5000)

    # Take a screenshot
    page.screenshot(path="redesign_verification.png")

    print("Successfully navigated to the setup screen.")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
