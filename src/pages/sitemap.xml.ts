import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { chiBaiDang } from '../lib/bai';

// Sơ đồ trang cho Google: trang chủ và mọi bài đã xuất bản (bỏ bài nháp).
// Tạo lúc build, nên viết bài mới xong build lại là sitemap tự có bài đó.
export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const goc = site ?? new URL('https://lethugiang.com');
  const bai = chiBaiDang(await getCollection('bai'));
  const moiNhat = bai[0]?.data.ngay;
  const ngay = (d?: Date) => (d ? `<lastmod>${d.toISOString().slice(0, 10)}</lastmod>` : '');
  const dong = [
    `<url><loc>${new URL('/', goc).href}</loc>${ngay(moiNhat)}</url>`,
    ...bai.map((b) => `<url><loc>${new URL(`/bai/${b.id}/`, goc).href}</loc>${ngay(b.data.ngay)}</url>`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${dong.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
