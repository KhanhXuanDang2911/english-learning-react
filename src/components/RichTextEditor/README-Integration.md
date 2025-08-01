# Tích hợp RichTextEditor với React Hook Form

## Cài đặt các dependencies cần thiết

Đảm bảo bạn đã cài đặt các package sau:

```bash
npm install react-hook-form @hookform/resolvers zod
```

## Cách sử dụng FormRichTextEditor

### 1. Import các component cần thiết

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormRichTextEditor } from "@/components/RichTextEditor/FormRichTextEditor";
```

### 2. Tạo schema validation với Zod

```tsx
const formSchema = z.object({
  content: z.string().min(1, "Nội dung là bắt buộc"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;
```

### 3. Setup useForm hook

```tsx
const form = useForm<FormData>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    content: "<p>Nội dung mặc định...</p>",
    description: "",
  },
});
```

### 4. Sử dụng FormRichTextEditor trong form

```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormRichTextEditor
      control={form.control}
      name="content"
      label="Nội dung"
      description="Viết nội dung chi tiết"
      placeholder="Bắt đầu viết..."
      className="space-y-2"
    />

    <Button type="submit">Lưu</Button>
  </form>
</Form>
```

## Props của FormRichTextEditor

| Prop          | Type                      | Required | Description               |
| ------------- | ------------------------- | -------- | ------------------------- |
| `control`     | `Control<TFieldValues>`   | ✅       | Control object từ useForm |
| `name`        | `FieldPath<TFieldValues>` | ✅       | Tên field trong form      |
| `label`       | `string`                  | ❌       | Label hiển thị            |
| `description` | `string`                  | ❌       | Mô tả field               |
| `placeholder` | `string`                  | ❌       | Placeholder cho editor    |
| `disabled`    | `boolean`                 | ❌       | Disable editor            |
| `className`   | `string`                  | ❌       | CSS class custom          |

## Ví dụ hoàn chỉnh

Xem file `ExampleFormWithRichText.tsx` để có ví dụ hoàn chỉnh về cách sử dụng.

## Validation

FormRichTextEditor tích hợp hoàn toàn với React Hook Form validation:

- Hiển thị lỗi validation tự động
- Support Zod schema validation
- Có thể sử dụng custom validation rules

```tsx
const formSchema = z.object({
  content: z
    .string()
    .min(10, "Nội dung phải có ít nhất 10 ký tự")
    .refine(
      (val) =>
        val !== "<p></p>" && val.replace(/<[^>]*>/g, "").trim().length > 0,
      "Nội dung không được để trống"
    ),
});
```

## Features

- ✅ Tích hợp hoàn toàn với React Hook Form
- ✅ Support validation với Zod
- ✅ Hiển thị lỗi validation tự động
- ✅ Support controlled component pattern
- ✅ Có thể disable/enable
- ✅ Customizable styling
- ✅ TypeScript support đầy đủ
