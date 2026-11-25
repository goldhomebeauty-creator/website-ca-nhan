// Bài viết của blog: mỗi bài là một file Markdown trong src/content/bai/.
// Tên file là đường dẫn bài: nam-da-la-gi.md -> /bai/nam-da-la-gi/
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const bai = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bai' }),
  schema: ({ image }) =>
    z.object({
      tieuDe: z.string(),
      moTa: z.string().max(200),
      ngay: z.coerce.date(),
      capNhat: z.coerce.date().optional(),
      chuDe: z.enum(['cham-da', 'nam-sam', 'loi-song', 'goc-tam-su']),
      anh: image().optional(),
      anhMoTa: z.string().optional(),
      // Khung "Tóm tắt 30 giây" ở đầu bài
      tomTat: z.array(z.string()).default([]),
      // Hộp "Nên / Tránh" sau phần thân bài
      nen: z.array(z.string()).default([]),
      tranh: z.array(z.string()).default([]),
      // Hộp "Khi nào cần gặp bác sĩ"
      gapBacSi: z.array(z.string()).default([]),
      hoiDap: z.array(z.object({ hoi: z.string(), dap: z.string() })).default([]),
      lienQuan: z.array(reference('bai')).default([]),
      noiBat: z.boolean().default(false),
      nhap: z.boolean().default(false),
    }),
});

export const collections = { bai };
