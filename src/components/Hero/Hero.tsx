import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import HeroCarousel from "../HeroCarousel";
import BackgroundPattern from "../BackgroundPattern";

const Hero = () => {
  return (
    <div className="bg-slate-200 relative overflow-hidden">
      <BackgroundPattern />
      <div className="main-layout relative z-10">
        <div className="min-h-[calc(100vh-80px)] w-full flex flex-col gap-10 items-center justify-center px-6 py-14">
          <div className="text-center max-w-2xl">
            <Badge className="rounded-full py-1 border-none bg-primary-color">
              Your english - Your future
            </Badge>
            <h1 className="mt-6 text-3xl sm:text-[33px] md:text-[38px] font-bold !leading-[1.2] tracking-tight text-primary-color">
              K-English – Học tiếng Anh thông minh, hiệu quả mỗi ngày
            </h1>
            <p className="mt-6 text-[14px] md:text-[16px] text-primary-color">
              Khóa học tiếng Anh thực tế, dễ hiểu, phù hợp mọi trình độ. Giao
              tiếp trôi chảy, phát âm chuẩn, luyện tập hàng ngày theo lộ trình
              cá nhân hóa.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full text-[14px] cursor-pointer bg-orange-500 hover:bg-orange-500/80"
              >
                Bắt đầu <ArrowUpRight className="!h-5 !w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full text-[14px] shadow-none cursor-pointer"
              >
                <CirclePlay className="!h-5 !w-5" /> Xem giới thiệu
              </Button>
            </div>
          </div>
          <div className="w-full">
            <HeroCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
