import type { CollectionEntry } from 'astro:content';

export const CHU_DE = {
  'cham-da': { ten: 'Chăm da', the: 't-skin' },
  'nam-sam': { ten: 'Nám & sạm', the: 't-nam' },
  'loi-song': { ten: 'Lối sống', the: 't-life' },
  'goc-tam-su': { ten: 'Góc tâm sự', the: 't-heart' },
} as const;

/** Số phút đọc, tính theo khoảng 220 chữ mỗi phút. */
export function phutDoc(noiDung = ''): number {
  const chu = noiDung
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(chu / 220));
}

/** Ngày kiểu Việt Nam: 25/11/2026 */
export function ngayVN(d: Date): string {
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' });
}

/** Bài đã xuất bản (bỏ bài nháp khi build bản chính thức), mới nhất trước. */
export function chiBaiDang(ds: CollectionEntry<'bai'>[]): CollectionEntry<'bai'>[] {
  return ds
    .filter((b) => import.meta.env.DEV || !b.data.nhap)
    .sort((a, b) => b.data.ngay.valueOf() - a.data.ngay.valueOf());
}

/** Phút đọc của cả bài: thân bài cộng các hộp tóm tắt, nên/tránh, hỏi đáp. */
export function phutDocBai(b: CollectionEntry<'bai'>): number {
  const d = b.data;
  const them = [...d.tomTat, ...d.nen, ...d.tranh, ...d.gapBacSi, ...d.hoiDap.flatMap((q) => [q.hoi, q.dap])].join(' ');
  return phutDoc(`${b.body ?? ''} ${them}`);
}
