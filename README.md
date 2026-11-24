# website-ca-nhan

Website cá nhân, dựng bằng [Astro](https://astro.build) và chạy trên Cloudflare Workers (adapter `@astrojs/cloudflare`).

## Lệnh thường dùng

| Lệnh | Việc làm |
| --- | --- |
| `npm install` | Cài thư viện |
| `npm run dev` | Chạy thử ở `localhost:4321` |
| `npm run build` | Build ra thư mục `dist/` |
| `npm run cf-preview` | Build rồi chạy thử bằng môi trường Workers thật (wrangler) |
| `npm run deploy` | Build và đưa lên Cloudflare (cần `wrangler login` hoặc `CLOUDFLARE_API_TOKEN`) |
| `npm run generate-types` | Tạo lại kiểu TypeScript sau khi sửa `wrangler.jsonc` |

## Cấu trúc

- `src/pages/` - mỗi file `.astro` là một trang (`index.astro` là trang chủ)
- `src/layouts/Layout.astro` - khung chung (thẻ `<head>`, kiểu chữ)
- `public/` - ảnh, favicon, file tĩnh
- `wrangler.jsonc` - cấu hình Cloudflare Workers (tên worker: `website-ca-nhan`)
