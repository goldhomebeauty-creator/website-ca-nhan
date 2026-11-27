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
      chuDe: z.enum(['cham-da', 'nam-sam', 'loi-song', 'goc-tam-su', 'song-khoe']),
      anh: image().optional(),
      anhMoTa: z.string().optional(),
      anhChuThich: z.string().optional(),
      // Khung "Tóm tắt 30 giây" ở đầu bài
      tomTat: z.array(z.string()).default([]),
      // Hộp "Nên / Tránh" sau phần thân bài
      nen: z.array(z.string()).default([]),
      tranh: z.array(z.string()).default([]),
      // Hộp "Khi nào cần gặp bác sĩ"
      gapBacSi: z.array(z.string()).default([]),
      hoiDap: z.array(z.object({ hoi: z.string(), dap: z.string() })).default([]),
      // Video YouTube gắn vào GIỮA bài. Muốn đặt đúng chỗ thì viết dòng
      // <div data-video></div> trong thân bài; không có thì tự đặt trước mục giữa bài.
      video: z
        .object({
          id: z.string().regex(/^[\w-]{11}$/, 'Mã video YouTube có 11 ký tự'),
          tieuDe: z.string(),
          thoiLuong: z.string().regex(/^\d{1,2}:\d{2}(:\d{2})?$/, 'Dạng 5:55 hoặc 1:02:03'),
          ngayDang: z.coerce.date(),
          // Mốc thời gian, bấm vào là tua tới đó: { t: "1:20", ten: "Sai lầm 1" }
          chuong: z.array(z.object({ t: z.string(), ten: z.string() })).default([]),
        })
        .optional(),
      lienQuan: z.array(reference('bai')).default([]),
      noiBat: z.boolean().default(false),
      nhap: z.boolean().default(false),
    }),
});

export const collections = { bai };
