import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => (
  <section
    id="contact"
    className="min-h-screen flex items-center justify-center py-20 bg-gray-50"
  >
    <div className="max-w-6xl mx-auto px-6">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="inline-block mb-4">
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            Liên hệ với chúng tôi
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Hãy kết nối với chúng tôi
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Đội ngũ thân thiện của chúng tôi luôn sẵn sàng hỗ trợ bạn trên hành
          trình học tập.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Email Card */}
        <div className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-6 group-hover:bg-blue-700 transition-colors duration-300">
            <MailIcon className="h-6 w-6 text-white" />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
          <p className="text-gray-600 mb-4 text-sm">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn qua email 24/7.
          </p>
          <a
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            href="mailto:xuankhanh1129@gmail.com"
          >
            xuankhanh1129@gmail.com
          </a>
        </div>

        {/* Office Card */}
        <div className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
          <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg mb-6 group-hover:bg-green-700 transition-colors duration-300">
            <MapPinIcon className="h-6 w-6 text-white" />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Văn phòng
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            Hãy ghé thăm văn phòng chính của chúng tôi.
          </p>
          <Link
            className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
            to=""
          >
            100 Đường Nguyễn Văn A, <br />
            Quận B, Đà Nẵng
          </Link>
        </div>

        {/* Phone Card */}
        <div className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg mb-6 group-hover:bg-purple-700 transition-colors duration-300">
            <PhoneIcon className="h-6 w-6 text-white" />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Điện thoại
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            Thứ 2 - Thứ 6 từ 8:00 đến 17:00.
          </p>
          <a
            className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
            href="tel:+84912345678"
          >
            +84 912 345 678
          </a>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <div className="inline-flex items-center justify-center px-6 py-3 bg-white rounded-lg border border-gray-200 shadow-sm">
          <span className="text-gray-700 font-medium">
            Luôn sẵn sàng đồng hành cùng bạn
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
