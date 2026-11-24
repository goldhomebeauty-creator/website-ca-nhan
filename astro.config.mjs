// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  // Blog là trang tĩnh, không dùng Astro sessions. Tắt để adapter không tự thêm
  // binding KV "SESSION" thiếu namespace_id (Cloudflare từ chối deploy, mã 10021).
  session: false,
});
