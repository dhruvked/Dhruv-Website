import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';

const artifactDir = 'C:\\Users\\Dhruv\\.gemini\\antigravity\\brain\\b30d9231-7efc-4b68-92a8-b7eb8432c411';

async function main() {
  console.log('Spawning fresh preview server on strict port 5173...');
  const server = spawn('npx.cmd', ['vite', 'preview', '--port', '5173', '--strictPort'], {
    cwd: 'C:\\Users\\Dhruv\\Documents\\Programs\\Dhruv_Website',
    shell: true
  });

  server.stdout.on('data', (d) => console.log('SERVER STDOUT:', d.toString()));
  server.stderr.on('data', (d) => console.error('SERVER STDERR:', d.toString()));

  // Wait 4 seconds for strict server on 5173
  await new Promise((r) => setTimeout(r, 4000));

  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Desktop View (1280x800)
  await page.setViewport({ width: 1280, height: 800 });
  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 2000)); // Render 3D Canvas

  const timestamp = Date.now();
  const desktopFile = path.join(artifactDir, `website_desktop_screenshot_${timestamp}.png`);
  await page.screenshot({ path: desktopFile, fullPage: true });
  console.log('NEW Desktop Screenshot Saved:', desktopFile);

  // Mobile View
  await page.setViewport({ width: 375, height: 812 });
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 2000));

  const mobileFile = path.join(artifactDir, `website_mobile_screenshot_${timestamp}.png`);
  await page.screenshot({ path: mobileFile, fullPage: true });
  console.log('NEW Mobile Screenshot Saved:', mobileFile);

  await browser.close();
  server.kill();
  console.log('SUCCESSFULLY_CAPTURED');
  process.exit(0);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
