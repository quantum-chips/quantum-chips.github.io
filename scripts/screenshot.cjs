// Full-page screenshots of every route via the system Chrome (puppeteer-core).
// Usage: start the app (e.g. `npm run start`), then `npm run shot`.
// Override the target with SHOT_BASE, or Chrome with CHROME_PATH.
const puppeteer = require("puppeteer-core");
const fs = require("fs");

const BASE = process.env.SHOT_BASE || "http://localhost:3000";
const CHROME =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = "screenshots";
const routes = [
  ["home", "/"],
  ["problem", "/problem"],
  ["demo", "/demo"],
  ["method", "/method"],
  ["team", "/team"],
  ["resources", "/resources"],
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1.5 });
  for (const [name, path] of routes) {
    await page.goto(BASE + path, { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 700));
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
    console.log("shot", name);
  }
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: `${OUT}/home-mobile.png`, fullPage: true });
  console.log("shot home-mobile");
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
