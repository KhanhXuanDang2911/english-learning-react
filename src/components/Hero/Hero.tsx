import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpenCheck, Globe, Sparkles } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";

const Hero = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[700px] bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 overflow-hidden">
      {/* Animated background (keep it but it's behind content) */}
      <AnimatedBackground />

      {/* Soft decorative circles — no animation to avoid interference */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="hidden md:block absolute top-10 left-5 w-32 h-32 bg-sky-400/12 rounded-full blur-2xl"
          style={{ animationDelay: "0s" }}
          aria-hidden
        />
        <div
          className="hidden md:block absolute top-32 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl"
          style={{ animationDelay: "1s" }}
          aria-hidden
        />
        <div
          className="hidden md:block absolute bottom-20 left-1/3 w-36 h-36 bg-cyan-400/8 rounded-full blur-2xl"
          style={{ animationDelay: "2s" }}
          aria-hidden
        />
        <div
          className="hidden md:block absolute bottom-40 right-1/4 w-28 h-28 bg-indigo-400/10 rounded-full blur-2xl"
          style={{ animationDelay: "1.5s" }}
          aria-hidden
        />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 md:px-8 main-layout">
        {/* grid: 1 column on small screens, 2 on md/lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-12 md:py-16">
          {/* LEFT: content */}
          <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 text-white shadow-lg">
                <Sparkles size={16} />
              </div>
              <span className="text-sm font-medium text-sky-700 bg-sky-100/80 px-3 py-1 rounded-full">
                Khám phá nhiều khóa học chất lượng cao
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                Học Tiếng Anh
                <br />
                <span className="relative bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent inline-block">
                  Thông Minh Hơn
                  <svg
                    className="absolute -bottom-3 left-0 w-full h-4 text-sky-500"
                    viewBox="0 0 400 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M3 8C60 3 120 13 200 8C280 3 340 13 397 8"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="animate-draw-line"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Nâng cao trình độ tiếng Anh của bạn và mở ra cơ hội nghề nghiệp
                tuyệt vời với nền tảng học trực tuyến hiện đại nhất.
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm border border-sky-100">
                <BookOpenCheck size={16} className="text-sky-600" />
                <span className="text-sm font-medium text-slate-700">
                  Học từ vựng hiệu quả
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm border border-blue-100">
                <Globe size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-slate-700">
                  Giao tiếp tự tin
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mt-2">
              <Button
                size="lg"
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-sky-500 hover:bg-sky-600 text-white text-base md:text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03]"
                aria-label="Bắt đầu học ngay"
              >
                Bắt đầu học ngay
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 border-2 border-sky-500 text-sky-600 hover:bg-sky-50 text-base md:text-lg font-medium rounded-2xl transition-all duration-300"
                aria-label="Xem khóa học"
              >
                Xem khóa học
              </Button>
            </div>
          </div>

          {/* RIGHT: image + decorative */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              className="relative group will-change-transform"
              style={{ transform: "translateZ(0)" }}
            >
              {/* Responsive image: use max-w + aspect ratio, crop from top */}
              <img
                src="/images/hero_1.png"
                alt="Vietnamese student learning English - Maccy on Unsplash"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full max-w-[360px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px] aspect-[4/5] object-cover object-top rounded-3xl shadow-2xl transform transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.02]"
                style={{ backfaceVisibility: "hidden" }}
              />

              {/* Decorative gradient rings — animate only on lg+ to reduce jank */}
              <div className="absolute inset-0 -z-10 pointer-events-none">
                <div
                  className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-r from-sky-400/25 to-blue-400/20 rounded-full"
                  aria-hidden
                />
                <div
                  className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] md:w-[450px] md:h-[450px] bg-gradient-to-r from-cyan-400/15 to-indigo-400/12 rounded-full"
                  aria-hidden
                />
                <div
                  className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[500px] md:h-[500px] bg-gradient-to-r from-blue-300/8 to-sky-300/10 rounded-full"
                  aria-hidden
                />
              </div>

              {/* Floating badges */}
              <div
                className="absolute -top-3 -right-3 bg-white rounded-full p-2 sm:p-3 shadow-lg"
                style={{ transform: "translateZ(0)" }}
              >
                <Sparkles size={18} className="text-sky-500" />
              </div>
              <div
                className="absolute -bottom-3 -left-3 bg-sky-500 text-white rounded-full p-2 sm:p-3 shadow-lg"
                style={{ transform: "translateZ(0)" }}
              >
                <BookOpenCheck size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
