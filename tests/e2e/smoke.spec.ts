import { test, expect } from '@playwright/test';

test('menu starts the first world and captures reference screenshots', async ({ page }) => {
  test.setTimeout(60000);
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.goto('/');
  const canvas = page.locator('#game-root canvas');
  await expect(canvas).toBeVisible();
  await expect(canvas).toHaveCount(1);
  await page.screenshot({ path: 'docs/shots/menu.png' });
  const bounds = await canvas.boundingBox();
  expect(bounds).not.toBeNull();
  if (!bounds) throw new Error('Canvas did not receive layout bounds');
  await canvas.click({ position: { x: bounds.width * 0.125 + 120, y: bounds.height * 0.56 + 30 } });
  await page.waitForTimeout(500);
  await canvas.screenshot({ path: 'docs/shots/first-world.png', timeout: 15000, animations: 'disabled' });
  await page.keyboard.down('ArrowRight');
  await page.waitForTimeout(500);
  await page.keyboard.up('ArrowRight');
  expect(pageErrors).toEqual([]);
});

test('world map opens and starts the first unlocked story level', async ({ page }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.goto('/');
  const canvas = page.locator('#game-root canvas');
  await expect(canvas).toBeVisible();
  const bounds = await canvas.boundingBox();
  expect(bounds).not.toBeNull();
  if (!bounds) throw new Error('Canvas did not receive layout bounds');
  await canvas.click({ position: { x: bounds.width * 0.125 + 100, y: bounds.height * 0.66 + 20 } });
  await page.waitForTimeout(350);
  await canvas.screenshot({ path: 'docs/shots/world-map.png', timeout: 15000, animations: 'disabled' });
  await canvas.click({ position: { x: bounds.width * (127 / 1280), y: bounds.height * (233 / 720) } });
  await page.waitForTimeout(350);
  expect(pageErrors).toEqual([]);
});

test('touch controls are visible on a mobile-sized viewport', async ({ browser }) => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page.goto('/');
  await expect(page.locator('#game-root canvas')).toBeVisible();
  await expect(page.locator('#touch-controls')).toBeVisible();
  await expect(page.locator('[data-control="jump"]')).toBeVisible();
  await page.close();
});
