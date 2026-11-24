# Outline blog mới - Lê Thu Giang

Phong cách: phẳng, tối giản, nhiều khoảng trắng, chữ to dễ đọc. Giọng văn bình tĩnh, khoa học, tử tế.
Phương châm xuyên suốt: **Hiểu da - Chọn đúng - Làm đủ.**

## 1. Hệ thống thiết kế

- **Font:** Be Vietnam Pro (thiết kế cho tiếng Việt, dấu rõ). Thân bài 18px, dòng cao 1.75, mỗi dòng tối đa ~68 ký tự.
- **Màu sáng:** nền kem `#FBF8F4`, chữ `#1F1B18`, nhấn hồng đất `#C2185B`/`#B4495F`, phụ xanh lá nhạt.
- **Màu tối:** nền `#14110F`, chữ `#EDE6DF`, nhấn hồng nhạt `#F28BA8`.
- **Chế độ sáng/tối:** tự đổi theo giờ địa phương của người xem (06:00-18:00 sáng, còn lại tối). Nút chuyển ở góc trên bên phải, lựa chọn tay được ghi nhớ.
- Không bóng đổ nặng, góc bo 14px, viền mảnh 1px, biểu tượng nét.

## 2. Trang chủ (bản HTML đầu tiên)

1. **Thanh đầu trang:** logo chữ "Thu Giang", menu (Chăm da, Nám & sạm, Lối sống, Góc tâm sự, Giới thiệu), ô tìm kiếm, nút sáng/tối.
2. **Hero:** lời chào theo buổi trong ngày, phương châm, 2 nút (Bắt đầu đọc, Tìm hiểu làn da của bạn).
3. **Bài nổi bật:** 1 bài lớn + 2 bài phụ.
4. **Khám phá theo chủ đề:** 4 thẻ chuyên mục.
5. **Lộ trình cho người mới:** 3 bước Hiểu da - Chọn đúng - Làm đủ, mỗi bước dẫn tới bài nền tảng.
6. **Bài mới nhất:** lưới thẻ có thời gian đọc, chuyên mục.
7. **Hỏi nhanh đáp gọn (FAQ):** đáp ứng góp ý của bạn đọc muốn có mục hỏi đáp.
8. **Về Giang:** ảnh, đoạn giới thiệu ngắn, lời cam kết "không hứa thần tốc".
9. **Nhận thư mỗi tuần:** form email.
10. **Chân trang:** chuyên mục, mạng xã hội, lưu ý y khoa.

## 3. Trang bài viết (bước sau)

- Thanh tiến độ đọc ở đầu trang, mục lục dính bên cạnh (desktop), cỡ chữ điều chỉnh được.
- Khung "Tóm tắt 30 giây" đầu bài, hộp "Nên / Tránh", hộp "Khi nào cần gặp bác sĩ".
- Hình minh họa phẳng, sơ đồ cơ chế (đáp ứng góp ý của bạn đọc).
- Cuối bài: tác giả, bài liên quan, FAQ, chia sẻ.

## 4. Các trang khác

- Chuyên mục, Tìm kiếm, Giới thiệu, Liên hệ, Trang 404 thân thiện.
- Sau này: trắc nghiệm "Da bạn thuộc loại nào", thư viện hoạt chất (A-Z).

## 5. Kỹ thuật

- Bản HTML tĩnh hiện tại, sau chuyển sang Astro (Cloudflare Workers) với nội dung Markdown.
- Đạt Lighthouse 95+, tương phản AA ở cả 2 chế độ, hỗ trợ bàn phím, `prefers-reduced-motion`.
