import fs from "fs";
import path from "path";

const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");

if (!fs.existsSync(sitemapPath)) {
  process.exit(0);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = fs.readFileSync(sitemapPath, "utf8");

const updated = sitemap.replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

fs.writeFileSync(sitemapPath, updated, "utf8");
