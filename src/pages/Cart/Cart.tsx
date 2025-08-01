"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { ShoppingCart, Trash2, ArrowRight } from "lucide-react"
import routes from "@/routes/routes.const"

// Mock cart data (same as in Header for consistency)
const cartItems = [
  {
    id: 1,
    title: "Tiếng Anh giao tiếp cho người mới bắt đầu",
    price: 299000,
    originalPrice: 1299000,
    image:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    instructor: "Nguyễn Văn A",
  },
  {
    id: 2,
    title: "Luyện thi TOEIC cấp tốc 2025",
    price: 399000,
    originalPrice: 1599000,
    image:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    instructor: "Trần Thị B",
  },
  {
    id: 3,
    title: "Từ vựng tiếng Anh cho người đi làm",
    price: 199000,
    originalPrice: 899000,
    image:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    instructor: "Lê Văn C",
  },
]

export default function Cart() {
  const totalItems = cartItems.length
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const discount = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0)
  const finalTotal = subtotal

  const handleRemoveItem = (id: number) => {
    console.log("Remove item:", id)
    // Implement actual removal logic here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="main-layout py-8">
        <h1 className="text-3xl font-bold text-primary-color mb-6">Giỏ hàng của bạn</h1>

        {totalItems === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-lg text-gray-600 mb-4">Giỏ hàng của bạn đang trống.</p>
              <Button className="bg-primary-color hover:bg-hover-primary-color" asChild>
                <Link to={routes.COURSES}>Khám phá các khóa học</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full sm:w-32 h-24 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg line-clamp-2 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.instructor}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary-color text-lg">{item.price.toLocaleString()}đ</span>
                        <span className="text-sm text-gray-500 line-through">
                          {item.originalPrice.toLocaleString()}đ
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 self-end sm:self-center"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                      <span className="sr-only">Xóa khỏi giỏ hàng</span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Tóm tắt đơn hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Tổng phụ ({totalItems} sản phẩm)</span>
                    <span>{subtotal.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Giảm giá</span>
                    <span>-{discount.toLocaleString()}đ</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Tổng cộng</span>
                    <span className="text-primary-color">{finalTotal.toLocaleString()}đ</span>
                  </div>
                  <Button className="w-full bg-primary-color hover:bg-hover-primary-color" size="lg">
                    Tiến hành thanh toán <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link to={routes.COURSES}>Tiếp tục mua sắm</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
