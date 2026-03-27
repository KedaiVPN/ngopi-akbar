import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Calendar, Users, ChevronRight } from "lucide-react";

interface AcaraCardProps {
  id: string;
  judul: string;
  coverUrl: string;
  tanggal: Date;
  pesertaCount: number;
  kontenSnippet: string;
}

export default function AcaraCard({ id, judul, coverUrl, tanggal, pesertaCount, kontenSnippet }: AcaraCardProps) {
  // Strip HTML tags for the snippet
  const snippet = kontenSnippet.replace(/<[^>]*>?/gm, '');
  const truncatedSnippet = snippet.length > 120 ? `${snippet.substring(0, 120)}...` : snippet;

  return (
    <Link
      href={`/acara/${id}`}
      className="group block bg-white rounded-2xl border border-[#eaddd1] shadow-sm hover:shadow-xl hover:border-[#8B5A2B]/40 transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
    >
      <div className="relative h-64 w-full overflow-hidden">
        {/* Next.js Image Component (Crashed in Production)*/}
        <Image
          src={coverUrl}
          alt={judul}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized={true}
        />
        {/*
        <img
          src={coverUrl}
          alt={judul}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 flex gap-3">
          <div className="flex items-center gap-1.5 bg-[#4A3728]/80 backdrop-blur-sm text-[#fdfaf6] px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-white/10">
            <Calendar size={14} />
            {format(new Date(tanggal), 'dd MMM yyyy', { locale: localeId })}
          </div>
          <div className="flex items-center gap-1.5 bg-[#8B5A2B]/90 backdrop-blur-sm text-[#fdfaf6] px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-white/10">
            <Users size={14} />
            {pesertaCount} Hadirin
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-[#4A3728] mb-3 group-hover:text-[#8B5A2B] transition-colors line-clamp-2">
          {judul}
        </h3>
        <p className="text-[#6b5847] text-sm leading-relaxed mb-6 line-clamp-3">
          {truncatedSnippet}
        </p>
        <div className="flex items-center text-[#8B5A2B] font-medium text-sm group-hover:underline mt-auto">
          Lihat Dokumentasi Lengkap
          <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
