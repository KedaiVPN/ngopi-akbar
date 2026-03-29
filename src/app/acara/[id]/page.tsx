import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import { db } from "@/db";
import { acara, peserta, galeri } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Calendar, Users, ChevronLeft, UserCheck, ImageIcon } from "lucide-react";
import Link from "next/link";
import GalleryLightbox from "@/components/public/GalleryLightbox";
import FadeIn from "@/components/animations/FadeIn";
import ScaleUp from "@/components/animations/ScaleUp";

export const dynamic = "force-dynamic";

async function getAcaraDetail(id: string) {
  try {
    const dataAcara = await db.select().from(acara).where(eq(acara.id, id)).get();

    if (!dataAcara) {
      return null;
    }

    const dataPeserta = await db.select().from(peserta).where(eq(peserta.acaraId, id));
    const dataGaleri = await db.select().from(galeri).where(eq(galeri.acaraId, id));

    return { ...dataAcara, peserta: dataPeserta, galeri: dataGaleri };
  } catch (error) {
    console.error("Database Error (getAcaraDetail):", error);
    return null; // Return null so it triggers notFound() cleanly
  }
}

export default async function DetailAcara({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getAcaraDetail(id);

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fdfaf6] font-sans selection:bg-[#8B5A2B] selection:text-white">
      <Header />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <FadeIn delay={0.1}>
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#8B5A2B] hover:text-[#4A3728] transition-colors font-medium hover:bg-[#eaddd1] px-4 py-2 rounded-full border border-transparent hover:border-[#d4c5b9]"
            >
              <ChevronLeft size={20} />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </FadeIn>

        <article className="bg-white rounded-3xl border border-[#eaddd1] shadow-lg overflow-hidden">
          {/* Cover Image */}
          <FadeIn delay={0.2}>
            <div className="relative w-full h-80 md:h-[500px] overflow-hidden">
            {/* Next.js Image Component (Crashed in Production)*/}
            <Image
              src={data.coverUrl}
              alt={data.judul}
              fill
              className="object-cover"
              priority
              unoptimized={true}
            />
            {/*
            <img
              src={data.coverUrl}
              alt={data.judul}
              className="absolute inset-0 w-full h-full object-cover"
            />*/}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-white/20">
                    <Calendar size={16} />
                    {format(new Date(data.tanggal), 'EEEE, dd MMMM yyyy', { locale: localeId })}
                  </div>
                  <div className="inline-flex items-center gap-2 bg-[#8B5A2B]/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-white/20">
                    <Users size={16} />
                    {data.peserta.length} Hadirin
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2 drop-shadow-md">
                  {data.judul}
                </h1>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="p-8 md:p-12">
              <div className="prose prose-stone max-w-none md:prose-lg text-[#3e2723] prose-headings:text-[#4A3728] prose-a:text-[#8B5A2B] hover:prose-a:text-[#6e4823] prose-img:rounded-xl prose-img:border prose-img:border-[#d4c5b9]">
                {/* Render HTML from Tiptap, ensure Arabic class for RTL support */}
                <div
                  className="arabic-support tiptap-content font-sans leading-loose"
                  dangerouslySetInnerHTML={{ __html: data.kontenHtml }}
                />
              </div>
            </div>
          </FadeIn>

          {/* Galeri */}
          {data.galeri && data.galeri.length > 0 && (
            <ScaleUp delay={0.2}>
              <div className="border-t border-[#eaddd1] bg-white p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-[#eaddd1] rounded-xl text-[#8B5A2B]">
                  <ImageIcon size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#4A3728]">Galeri Acara</h2>
                </div>
                </div>
                <GalleryLightbox images={data.galeri.map(g => g.url)} />
              </div>
            </ScaleUp>
          )}

          {/* Daftar Peserta */}
          {data.peserta.length > 0 && (
            <ScaleUp delay={0.3}>
              <div className="border-t border-[#eaddd1] bg-[#fdfaf6] p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-[#eaddd1] rounded-xl text-[#8B5A2B]">
                  <UserCheck size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#4A3728]">Daftar Hadirin</h2>
                  <p className="text-[#8B5A2B] text-sm">Yang turut serta meramaikan acara</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {data.peserta.map((p, idx) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 bg-white p-4 rounded-xl border border-[#d4c5b9] shadow-sm hover:border-[#8B5A2B] transition-colors group"
                    >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#eaddd1] flex items-center justify-center text-sm font-bold text-[#8B5A2B] group-hover:bg-[#8B5A2B] group-hover:text-white transition-colors">
                      {idx + 1}
                    </div>
                    <span className="font-medium text-[#4A3728] truncate">{p.nama}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScaleUp>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
