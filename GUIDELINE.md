# DEV GUIDELINES

## 1. QUY TRÌNH: Think → Data → Code

- **Document First:** Không bao giờ gõ code nếu chưa rõ yêu cầu. Phải có luồng đi (Flow) hoặc hình vẽ nháp (Wireframe) trước.
- **Database Centric:** Dữ liệu là trái tim. Thiết kế Schema (cấu trúc bảng) chuẩn chỉ trước, vì sửa DB đau đớn gấp 10 lần sửa Code.
- **Scaffolding First:** Dựng khung sườn, thư mục, kết nối thông suốt trước khi đắp thịt (logic chi tiết).
- **Pragmatic Testing:** Test thông minh, không máy móc. Ưu tiên Unit Test cho các hàm logic quan trọng (tính toán, convert data). UI không cần test quá kỹ.

## 2. NGUYÊN TẮC: Simple & Clean

- **Vertical Slice Architecture:** Chia code theo **Tính năng (Feature)** thay vì chia theo lớp kỹ thuật (Layer). Tính năng nào ở yên chỗ đó.
- **KISS (Keep It Simple, Stupid):** Code "ngu" mà dễ đọc > Code "thông minh" mà hại não. Giải pháp đơn giản nhất thường là giải pháp tốt nhất.
- **DRY (Don't Repeat Yourself):** Thấy copy-paste 2 lần là phải tách hàm. Logic nghiệp vụ chỉ nằm ở 1 chỗ duy nhất.
- **SOLID (Flexible):** Tuân thủ để code mềm dẻo, nhưng cấm Over-engineering (đẻ ra 10 cái interface cho 1 hàm đơn giản).

## 3. TƯ DUY: Lean & Human

- **LEAN:** Loại bỏ rác. Chỉ làm những gì tạo ra giá trị ngay lập tức.
- **YAGNI (You Aren't Gonna Need It):** Cấm code đón đầu. Đừng lo chuyện của 2 năm sau. Chỉ code cái cần cho ngày hôm nay.
- **Code for Humans:** Viết code là để cho người khác đọc. Đặt tên biến rõ nghĩa, comment đầy đủ ở những chỗ logic phức tạp.

## 4. QUY ƯỚC ĐẶT TÊN

- **camelCase:** Javascript/Typescript, Java, JSON keys.
- **kebab-case:** HTML tags/attributes, CSS classes, URLs, Filenames.
- **PascalCase:** Class, Component, Interface/Type.
- **SCREAMING_SNAKE:** Hằng số, Config.
- **snake_case:** Database (Table/Column) và mọi trường hợp còn lại (Backend variables/functions).

## Error Handling

- **Never fail silently:** Always handle errors gracefully.
- **Async:** Wrap async calls in try/catch (or Result pattern).
- **User Feedback:** On UI, always show Feedback (Toast, Alert) for user actions.
- **Logging:** Use specific Error types, not generic `Error`. Log clearly for debugging.

## Documentation

- **Docstrings:** Add JSDoc/Docstrings for complex functions explaining inputs, outputs, and edge cases.
- **Comments:** Only comment "WHY", not "WHAT". (e.g., "Using Set for O(1) lookup" instead of "Creating a Set").
