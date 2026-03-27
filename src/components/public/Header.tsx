import Link from "next/link";
import { Coffee } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed w-full top-0 z-50 bg-[#fdfaf6]/90 backdrop-blur-md border-b border-[#d4c5b9] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#4A3728] text-[#fdfaf6] p-2 rounded-full group-hover:bg-[#8B5A2B] transition-colors">
              <Coffee size={24} />
            </div>
            <span className="font-bold text-xl tracking-wider text-[#4A3728] group-hover:text-[#8B5A2B] transition-colors">
              NGOPI AKBAR
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
