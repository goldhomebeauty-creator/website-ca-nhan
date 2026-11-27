// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Địa chỉ web, dùng cho ảnh chia sẻ link. Gắn tên miền riêng thì đổi dòng này.
  site: 'https://lethugiang.com',
  redirects: {
    '/bai/nam-sau-sinh-nam-noi-tiet/': { status: 301, destination: '/bai/nam-sau-sinh-co-tu-het-khong/' },
    '/bai/hoat-chat-lam-sang-nam-an-toan/': { status: 301, destination: '/bai/hoat-chat-lam-sang-nam/' },
    '/bai/ngu-du-da-dep/': { status: 301, destination: '/bai/giac-ngu-va-lan-da/' },
    '/bai/cham-soc-ban-than-khong-phai-ich-ky/': { status: 301, destination: '/bai/cham-soc-ban-than-khong-ich-ky/' },
    '/bai/kien-nhan-voi-lan-da/': { status: 301, destination: '/bai/kien-nhan-khi-cham-da/' },
    '/bai/sai-lam-khien-nam-dam-hon/': { status: 301, destination: '/bai/sai-lam-khi-cham-da-nam/' },
    '/bai/chong-nang-cho-da-bi-nam/': { status: 301, destination: '/bai/chong-nang-cho-da-nam/' },
  },
  // Ảnh được Astro nén và chia cỡ ngay lúc build bằng sharp (miễn phí),
  // không gọi dịch vụ Cloudflare Images lúc chạy.
  adapter: cloudflare({ imageService: 'compile' }),
  // Blog là trang tĩnh, không dùng Astro sessions. Tắt để adapter không tự thêm
  // binding KV "SESSION" thiếu namespace_id (Cloudflare từ chối deploy, mã 10021).
  session: false,
});
