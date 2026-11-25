// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Địa chỉ web, dùng cho ảnh chia sẻ link. Gắn tên miền riêng thì đổi dòng này.
  site: 'https://website-ca-nhan.goldhomebeauty.workers.dev',
  // Ảnh được Astro nén và chia cỡ ngay lúc build bằng sharp (miễn phí),
  // không gọi dịch vụ Cloudflare Images lúc chạy.
  adapter: cloudflare({ imageService: 'compile' }),
  // Blog là trang tĩnh, không dùng Astro sessions. Tắt để adapter không tự thêm
  // binding KV "SESSION" thiếu namespace_id (Cloudflare từ chối deploy, mã 10021).
  session: false,
});
