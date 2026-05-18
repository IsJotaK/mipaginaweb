import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'public', 'screenshots');
mkdirSync(outDir, { recursive: true });

const templates = [
  { name: 'rizoma-space', id: 1 },
  { name: 'micotizador', id: 2 },
  { name: 'tienda-online', id: 3 },
  { name: 'bufete-juridico', id: 4 },
  { name: 'restaurante', id: 5 },
  { name: 'blog-personal', id: 6 },
  { name: 'clinica-dental', id: 7 },
  { name: 'constructora', id: 8 },
  { name: 'marketplace', id: 9 },
  { name: 'fitclub', id: 10 },
  { name: 'agencia-digital', id: 11 },
  { name: 'inmobiliaria', id: 12 },
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  for (const t of templates) {
    console.log(`📸 Capturing: ${t.name}`);
    await page.goto(`http://localhost:5173/preview/${t.id}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

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
