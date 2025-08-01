# Dynamic Pagination Component

Component pagination động với logic thông minh và dấu "..." dựa trên shadcn/ui.

## Tính năng

- ✅ Hiển thị số trang động với dấu "..." (ellipsis)
- ✅ Nút Previous/Next
- ✅ Nút First/Last (tùy chọn)
- ✅ Responsive design
- ✅ Accessibility (ARIA labels)
- ✅ Tùy chỉnh số trang hiển thị tối đa
- ✅ Logic thông minh để hiển thị ellipsis
- ✅ **Custom CSS cho button và button active**

## Cách sử dụng

### Import

```tsx
import { DynamicPagination } from "@/components/DynamicPagination/dynamic-pagination";
```

### Basic Usage

```tsx
import React, { useState } from "react";
import { DynamicPagination } from "@/components/DynamicPagination/dynamic-pagination";

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Xử lý logic chuyển trang ở đây
  };

  return (
    <DynamicPagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
```

### Custom CSS cho button và button active

```tsx
<DynamicPagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  buttonClassName="border rounded text-black hover:bg-gray-200"
  activeButtonClassName="bg-orange-500 text-white border-orange-500"
/>
```

- `buttonClassName`: custom class cho tất cả các nút phân trang
- `activeButtonClassName`: custom class riêng cho nút active

### Với tùy chọn nâng cao

```tsx
<DynamicPagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  maxVisiblePages={5} // Số trang hiển thị tối đa (mặc định: 7)
  showFirstLast={true} // Hiển thị nút First/Last (mặc định: true)
  className="my-custom-class" // CSS class tùy chỉnh
  buttonClassName="..."
  activeButtonClassName="..."
/>
```

## Props

| Prop                    | Type                     | Default | Description                          |
| ----------------------- | ------------------------ | ------- | ------------------------------------ |
| `currentPage`           | `number`                 | -       | Trang hiện tại (bắt buộc)            |
| `totalPages`            | `number`                 | -       | Tổng số trang (bắt buộc)             |
| `onPageChange`          | `(page: number) => void` | -       | Callback khi chuyển trang (bắt buộc) |
| `maxVisiblePages`       | `number`                 | `7`     | Số trang hiển thị tối đa             |
| `showFirstLast`         | `boolean`                | `true`  | Hiển thị nút First/Last              |
| `className`             | `string`                 | -       | CSS class tùy chỉnh                  |
| `buttonClassName`       | `string`                 | -       | Custom class cho tất cả các nút      |
| `activeButtonClassName` | `string`                 | -       | Custom class cho nút active          |

## Logic hiển thị

### Khi tổng số trang ≤ maxVisiblePages

- Hiển thị tất cả các trang

### Khi tổng số trang > maxVisiblePages

- Luôn hiển thị trang đầu và trang cuối
- Hiển thị các trang xung quanh trang hiện tại
- Thêm dấu "..." khi cần thiết

### Ví dụ với 20 trang, maxVisiblePages = 7:

- **Trang 1**: `1 2 3 4 5 6 ... 20`
- **Trang 5**: `1 ... 3 4 5 6 7 ... 20`
- **Trang 10**: `1 ... 7 8 9 10 11 12 13 ... 20`
- **Trang 20**: `1 ... 15 16 17 18 19 20`

## Ví dụ trong ProductList

```tsx
// Tính toán pagination
const totalPages = Math.ceil(products.length / pageSize);
const startIndex = (currentPage - 1) * pageSize;
const endIndex = startIndex + pageSize;
const currentProducts = products.slice(startIndex, endIndex);

const handlePageChange = (page: number) => {
  setCurrentPage(page);
  // Scroll to top khi chuyển trang
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Render
{
  totalPages > 1 && (
    <div className="mt-8">
      <DynamicPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        maxVisiblePages={5}
        showFirstLast={true}
        buttonClassName="..."
        activeButtonClassName="..."
      />
    </div>
  );
}
```

## Demo

Xem file `pagination-demo.tsx` để có ví dụ đầy đủ về các cấu hình khác nhau.

## Accessibility

Component được thiết kế với accessibility tốt:

- ARIA labels cho các nút
- Keyboard navigation
- Screen reader support
- Focus management
