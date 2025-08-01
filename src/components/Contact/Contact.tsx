import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => (
  <div id="contact" className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <b className="text-muted-foreground">Liên hệ với chúng tôi</b>
      <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tight text-primary-color">
        Hãy kết nối với chúng tôi
      </h2>
      <p className="mt-4 text-base sm:text-lg">
        Đội ngũ thân thiện của chúng tôi luôn sẵn sàng hỗ trợ bạn.
      </p>

      <div className="max-w-screen-xl mx-auto py-24 grid md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-10 px-6 md:px-0">
        {/* Email */}
        <div className="text-center flex flex-col items-center">
          <div className="h-12 w-12 flex items-center justify-center bg-primary-color/10 text-primary-color rounded-full">
            <MailIcon />
          </div>
          <h3 className="mt-6 font-semibold text-xl">Email</h3>
          <p className="mt-2 text-muted-foreground">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn qua email.
          </p>
          <a
            className="mt-4 font-medium text-primary-color"
            href="mailto:example@email.com"
          >
            xuankhanh1129@gmail.com
          </a>
        </div>

        {/* Văn phòng */}
        <div className="text-center flex flex-col items-center">
          <div className="h-12 w-12 flex items-center justify-center bg-primary-color/10 text-primary-color rounded-full">
            <MapPinIcon />
          </div>
          <h3 className="mt-6 font-semibold text-xl">Văn phòng</h3>
          <p className="mt-2 text-muted-foreground">
            Hãy ghé thăm văn phòng chính của chúng tôi.
          </p>
          <Link className="mt-4 font-medium text-primary-color" to="">
            100 Đường Nguyễn Văn A, <br /> Quận B, Đà Nẵng
          </Link>
        </div>

        {/* Điện thoại */}
        <div className="text-center flex flex-col items-center">
          <div className="h-12 w-12 flex items-center justify-center bg-primary-color/10 text-primary-color rounded-full">
            <PhoneIcon />
          </div>
          <h3 className="mt-6 font-semibold text-xl">Điện thoại</h3>
          <p className="mt-2 text-muted-foreground">
            Thứ 2 - Thứ 6 từ 8:00 đến 17:00.
          </p>
          <a
            className="mt-4 font-medium text-primary-color"
            href="tel:+84912345678"
          >
            +84 912 345 678
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
