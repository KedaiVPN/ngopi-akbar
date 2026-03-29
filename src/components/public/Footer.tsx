import { Coffee, Heart, HeartHandshake } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function Footer() {
  return (
    <FadeIn>
    <footer className="bg-[#4A3728] text-[#eaddd1] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center gap-3 mb-6">
          <Coffee size={28} className="text-[#8B5A2B]" />
          <span className="font-bold text-2xl tracking-widest text-[#fdfaf6]">KANG NGOPI</span>
        </div>
        <p className="max-w-md mx-auto mb-8 text-[#d4c5b9] leading-relaxed">
          Dokumentasi Ngopi dan Silaturahmi. Merajut ukhuwah melalui secangkir kopi.
        </p>
        <div className="flex justify-center items-center gap-2 text-sm text-[#d4c5b9] border-t border-[#8B5A2B]/30 pt-8">
          <span>&copy; {new Date().getFullYear()} Kang Ngopi.</span>
          <span className="flex items-center gap-1">Dibuat dengan seduhan kopi <Coffee size={14} className="text-[#8B5A2B] fill-current" /></span>
        </div>
      </div>
    </footer>
    </FadeIn>
  );
}
