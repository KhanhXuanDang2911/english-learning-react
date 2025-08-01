import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormRichTextEditor } from "@/components/RichTextEditor";

// Simple schema for testing
const formSchema = z.object({
  content: z.string().min(1, "Nội dung là bắt buộc"),
});

type FormData = z.infer<typeof formSchema>;

export default function TestRichTextForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "<p>Bắt đầu viết nội dung...</p>",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Submitted data:", data);
    // alert("Form submitted! Check console for data.");
  };

  const setValueHTML = () => {
    form.setValue("content", "<p>Set tí nội dung...</p>");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Test Rich Text Editor Form</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Rich Text Editor Field */}
          <FormRichTextEditor
            control={form.control}
            name="content"
            label="Nội dung"
            description="Viết nội dung chi tiết cho bài viết"
          />

          <div className="flex gap-4">
            <Button type="submit">Lưu bài viết</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setValueHTML()}
            >
              Set tí nội dung
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
