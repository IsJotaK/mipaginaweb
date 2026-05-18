import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'public', 'screenshots');
mkdirSync(outDir, { recursive: true });

const templates = [
  { id: 1, name: 'rizoma-space', label: 'Rizoma Space' },
  { id: 2, name: 'micotizador', label: 'MiCotizador' },
  { id: 3, name: 'tienda-online', label: 'Tienda Online' },
  { id: 4, name: 'bufete-juridico', label: 'Bufete Jurídico' },
  { id: 5, name: 'restaurante', label: 'Restaurante' },
  { id: 6, name: 'blog-personal', label: 'Blog Personal' },
  { id: 7, name: 'clinica-dental', label: 'Clínica Dental' },
  { id: 8, name: 'constructora', label: 'Constructora' },
  { id: 9, name: 'marketplace', label: 'Marketplace' },
  { id: 10, name: 'fitclub', label: 'FitClub' },
  { id: 11, name: 'agencia-digital', label: 'Agencia Digital' },
  { id: 12, name: 'inmobiliaria', label: 'Inmobiliaria' },
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  for (const t of templates) {
    console.log(`📸 Capturing: ${t.label}`);
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    const card = page.locator('h3.font-semibold.text-gray-900', { hasText: t.label }).first();
    await card.scrollIntoViewIfNeeded();
    await card.click();
    await page.waitForTimeout(2500);

    await page.evaluate(() => {
      document.querySelectorAll('[class*="sticky"][class*="z-50"]').forEach(el => el.style.display = 'none');
    });
    await page.waitForTimeout(500);

    const filePath = join(outDir, `${t.name}.jpg`);
    await page.screenshot({ path: filePath, fullPage: true, type: 'jpeg', quality: 85 });
    console.log(`  ✅ screenshots/${t.name}.jpg`);
  }

  await browser.close();
  console.log('🎉 Todas las screenshots capturadas!');
}

run().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
