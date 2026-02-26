import asyncio
from playwright.async_api import async_playwright
import json

async def scrape_blogs():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        results = {}

        # 1. MusicRadar (Tech)
        try:
            await page.goto("https://www.musicradar.com/news", timeout=20000)
            headlines = await page.eval_on_selector_all('h3', 'elements => elements.map(e => e.innerText).slice(0, 5)')
            results['MusicRadar'] = headlines
        except Exception as e:
            results['MusicRadar'] = f"Error: {e}"

        # 2. EDM.com (Industry/Culture)
        try:
            await page.goto("https://edm.com/news", timeout=20000)
            headlines = await page.eval_on_selector_all('h2', 'elements => elements.map(e => e.innerText).slice(0, 5)')
            results['EDM.com'] = headlines
        except Exception as e:
            results['EDM.com'] = f"Error: {e}"

        # 3. Distrokid Blog (Distribution/Business)
        try:
            await page.goto("https://news.distrokid.com/", timeout=20000)
            headlines = await page.eval_on_selector_all('h3, h2', 'elements => elements.map(e => e.innerText).slice(0, 5)')
            results['DistroKid'] = headlines
        except Exception as e:
            results['DistroKid'] = f"Error: {e}"

        await browser.close()
        
        with open('scraped_news.json', 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    asyncio.run(scrape_blogs())
