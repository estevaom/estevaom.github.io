// Renders two files from the built site in dist/:
//   cv.pdf  - the page through its print stylesheet (the "Download CV" button)
//   og.jpg  - the hero at 1200×630, the image link previews show
// Run after `bun run build`. Set CHROMIUM_PATH to use a system Chromium instead of Playwright's own.
import { join, normalize } from "node:path";
import { chromium } from "playwright";

const root = "dist";
const server = Bun.serve({
  port: 0,
  async fetch(req) {
    let path = decodeURIComponent(new URL(req.url).pathname);
    if (path.endsWith("/")) path += "index.html";
    const file = Bun.file(join(root, normalize(path)));
    return (await file.exists()) ? new Response(file) : new Response("Not found", { status: 404 });
  },
});
const url = `http://localhost:${server.port}/`;
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });

try {
  const cv = await browser.newPage();
  await cv.emulateMedia({ media: "print", reducedMotion: "reduce" });
  await cv.goto(url, { waitUntil: "networkidle" });
  await cv.evaluate(() => document.fonts.ready);
  await cv.pdf({ path: join(root, "cv.pdf"), preferCSSPageSize: true });
  console.log(`wrote ${root}/cv.pdf`);

  // Reduced motion paints the sky once and holds still, so the snapshot is a finished painting
  const og = await browser.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: "reduce" });
  await og.goto(url, { waitUntil: "networkidle" });
  await og.evaluate(() => document.fonts.ready);
  await og.screenshot({ path: join(root, "og.jpg"), type: "jpeg", quality: 85 });
  console.log(`wrote ${root}/og.jpg`);
} finally {
  await browser.close();
  server.stop(true);
}
