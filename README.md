# English Learning (React)

Ứng dụng học tiếng Anh hiện đại được xây dựng bằng React + TypeScript, Vite và Tailwind CSS. Bao gồm các tính năng: khoá học, chương, bài học, bài viết, flashcards, chính tả, xác thực người dùng (email/mật khẩu và Google OAuth), phân trang, tải nội dung theo yêu cầu và giao diện hiện đại.

## Công nghệ sử dụng

- React 19 + TypeScript + Vite 7
- React Router v7 (`react-router-dom`)
- TanStack React Query v5 (quản lý gọi API & caching)
- Tailwind CSS v4, Radix UI (UI primitives), Lucide Icons
- React Hook Form + Zod (form & validation)
- Axios (HTTP) với cơ chế làm mới token, React-Toastify thông báo
- Trình soạn thảo Tiptap, DnD Kit, Embla Carousel, NProgress

## Tính năng

- Đăng ký/Đăng nhập, xác thực Google, tự động làm mới token, đăng xuất an toàn
- Quản lý khoá học, chương, bài học; bài viết/danh mục; flashcards; chính tả
- Phân trang động, lazy loading, loading toàn cục, thông báo toast
- Bảo vệ route (public/private/admin) với auth guard

## Yêu cầu hệ thống

- Node.js >= 18.18 (khuyến nghị LTS)
- npm v9+ hoặc pnpm/yarn (ví dụ dưới dùng npm)

## Cài đặt & chạy

1. Cài phụ thuộc

```bash
npm install
```

2. Biến môi trường

- Tạo file `.env` ở thư mục gốc dự án từ `.env.example`:

```bash
cp .env.example .env
```

- Điền biến sau:
  - `VITE_GOOGLE_CLIENT_ID`: Client ID của Google OAuth (dùng trong `src/App.tsx` qua `GoogleOAuthProvider`).

3. Chạy server phát triển

```bash
npm run dev
```

- Ứng dụng mặc định chạy tại http://localhost:3000 (xem `vite.config.ts`).

4. Build & Preview

```bash
npm run build
npm run preview
```

## Cấu hình Backend API

- API base URL hiện đặt trong `src/api/http.ts`:
  - `baseURL: "http://localhost:8080/e-learning"`
  - Các endpoint prefix `/api/v1` (xem `src/api/path.ts`).
- Khi triển khai nhiều môi trường, có thể chỉnh trực tiếp `baseURL` hoặc refactor đọc từ biến môi trường để linh hoạt hơn.

## Cấu trúc dự án (rút gọn)

```
src/
  api/           # axios instance, path, các module api
  components/    # UI components (Header, Footer, CourseItem, Editor, ...)
  context/       # AuthContext, AppContext
  hooks/         # custom hooks (use-mobile, use-pagination, ...)
  layouts/       # MainLayout, AdminLayout
  pages/         # trang chức năng (Courses, Posts, Lesson, Admin, ...)
  routes/        # định tuyến & guards
  types/         # type definitions (auth, course, post, ...)
  utils/         # tiện ích (token, appUtils, ...)
```

## Scripts

- `npm run dev`: Chạy server phát triển (Vite)
- `npm run build`: Build production (`tsc -b` + `vite build`)
- `npm run preview`: Preview build production
- `npm run lint`: Chạy ESLint

## Linting

- Dùng ESLint 9 + TypeScript ESLint:

```bash
npm run lint
```

## Ghi chú triển khai

- Bật CORS trên Backend để cho phép domain front-end (mặc định http://localhost:3000) gọi API.
- Google OAuth: đảm bảo Authorized JavaScript origins và redirect URIs khớp domain đang chạy.
