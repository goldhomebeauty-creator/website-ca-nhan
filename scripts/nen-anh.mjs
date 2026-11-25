// Nén ảnh trước khi đưa vào blog.
// Cách dùng:
//   1. Thả ảnh gốc (jpg, png, webp, avif, tiff) vào thư mục anh-goc/ ở gốc repo.
//      Muốn chia theo bài, tạo thư mục con: anh-goc/ten-bai/anh.jpg
//   2. Chạy: npm run nen-anh
//   3. Ảnh đã nén nằm ở src/assets/anh/ (giữ nguyên thư mục con), dạng .webp.
// Mỗi ảnh được: xoay đúng chiều, thu về tối đa 1600px chiều rộng (hoặc --max=...),
// đổi sang WebP chất lượng 80 (hoặc --q=...), xoá toàn bộ thông tin EXIF/GPS,
// đổi tên không dấu. Ảnh trong suốt (PNG tách nền) vẫn giữ nền trong suốt.
// Ảnh HEIC của iPhone: mở bằng Ảnh/Preview rồi xuất JPG trước, sharp không đọc HEIC.

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).filter((a) => a.startsWith('--')).map((a) => a.slice(2).split('='))
);
const VAO = path.resolve(args.vao ?? 'anh-goc');
const RA = path.resolve(args.ra ?? 'src/assets/anh');
const MAX = Number(args.max ?? 1600);
const Q = Number(args.q ?? 80);
const DUOI = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff']);

export function khongDau(ten) {
  return ten
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'anh';
}

function duyet(thuMuc) {
  return fs.readdirSync(thuMuc, { withFileTypes: true }).flatMap((m) => {
    const p = path.join(thuMuc, m.name);
    if (m.isDirectory()) return duyet(p);
    return DUOI.has(path.extname(m.name).toLowerCase()) ? [p] : [];
  });
}

async function main() {
  if (!fs.existsSync(VAO)) {
    fs.mkdirSync(VAO, { recursive: true });
    console.log(`Đã tạo thư mục ${path.relative(process.cwd(), VAO)}/. Thả ảnh gốc vào đó rồi chạy lại.`);
    return;
  }
  const files = duyet(VAO);
  if (!files.length) {
    console.log(`Chưa có ảnh nào trong ${path.relative(process.cwd(), VAO)}/.`);
    return;
  }
  let truoc = 0;
  let sau = 0;
  for (const f of files) {
    const rel = path.relative(VAO, path.dirname(f));
    const conThuMuc = rel ? rel.split(path.sep).map(khongDau) : [];
    const dich = path.join(RA, ...conThuMuc, khongDau(path.parse(f).name) + '.webp');
    fs.mkdirSync(path.dirname(dich), { recursive: true });
    // sharp mặc định không chép metadata (EXIF, GPS) sang ảnh mới
    const info = await sharp(f)
      .rotate()
      .resize({ width: MAX, withoutEnlargement: true })
      .webp({ quality: Q, alphaQuality: 90, effort: 5 })
      .toFile(dich);
    const kb = (n) => Math.round(n / 1024) + ' KB';
    const goc = fs.statSync(f).size;
    truoc += goc;
    sau += info.size;
    console.log(`${path.relative(process.cwd(), dich)}  ${info.width}x${info.height}  ${kb(goc)} -> ${kb(info.size)}`);
  }
  console.log(`Xong ${files.length} ảnh: ${Math.round(truoc / 1048576 * 10) / 10} MB -> ${Math.round(sau / 1048576 * 10) / 10} MB`);
}

main().catch((e) => {
  console.error('Lỗi khi nén ảnh:', e.message);
  process.exit(1);
});
