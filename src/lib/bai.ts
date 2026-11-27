import type { CollectionEntry } from 'astro:content';

export const CHU_DE = {
  'cham-da': {
    ten: 'Chăm da', the: 't-skin', tenDai: 'Chăm da cơ bản',
    gioiThieu: 'Làm sạch, dưỡng ẩm, chống nắng và cách đọc bảng thành phần. Nền móng vững thì mọi bước sau mới có tác dụng.',
  },
  'nam-sam': {
    ten: 'Nám & sạm', the: 't-nam', tenDai: 'Nám & sạm màu',
    gioiThieu: 'Nám nội tiết, nám sau sinh, hoạt chất làm sáng an toàn. Hiểu đúng để kiểm soát lâu dài, không chạy theo lời hứa trắng nhanh.',
  },
  'loi-song': {
    ten: 'Lối sống', the: 't-life', tenDai: 'Lối sống kỷ luật',
    gioiThieu: 'Giấc ngủ, ăn uống, vận động và những thói quen nhỏ mỗi ngày. Làn da phản ánh cách chị sống.',
  },
  'goc-tam-su': {
    ten: 'Góc tâm sự', the: 't-heart', tenDai: 'Góc tâm sự',
    gioiThieu: 'Yêu mình từ bên trong, sống chậm và tự tin hơn. Những điều Giang muốn ngồi nói với chị như hai chị em.',
  },
  'song-khoe': {
    ten: 'Sống khỏe', the: 't-khoe', tenDai: 'Sống khỏe',
    gioiThieu: 'Những chuyến đi, những giải chạy marathon và trail đồi núi Giang đã qua. Chuyện sức bền, kỷ luật và niềm vui được vận động ngoài trời.',
  },
} as const;

export type MaChuDe = keyof typeof CHU_DE;

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

export const KENH = {
  youtube: 'https://www.youtube.com/@L%C3%AAThuGiangOfficial',
  facebook: 'https://www.facebook.com/lethugiang.official',
  messenger: 'https://m.me/lethugiang.official',
  zalo: 'https://zalo.me/0946789136',
};

/** "5:55" hoặc "1:02:03" ra số giây. */
export function giay(moc: string): number {
  return moc.split(':').reduce((tong, so) => tong * 60 + Number(so), 0);
}

/** "5:55" ra dạng ISO 8601 cho Google: PT5M55S */
export function thoiLuongISO(moc: string): string {
  const s = giay(moc);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60;
  return `PT${h ? h + 'H' : ''}${m ? m + 'M' : ''}${r}S`;
}
