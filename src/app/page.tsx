export const dynamic = "force-dynamic";

import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import AcaraCard from "@/components/public/AcaraCard";
import FadeIn from "@/components/animations/FadeIn";
import ScaleUp from "@/components/animations/ScaleUp";
import { db } from "@/db";
import { acara, peserta } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { Coffee, ChevronDown, Image as ImageIcon } from "lucide-react";

async function getRecentAcara() {
  try {
    const result = await db
      .select({
        id: acara.id,
        judul: acara.judul,
        tanggal: acara.tanggal,
        coverUrl: acara.coverUrl,
        kontenHtml: acara.kontenHtml,
        pesertaCount: sql<number>`count(${peserta.id})`.mapWith(Number),
      })
      .from(acara)
      .leftJoin(peserta, eq(acara.id, peserta.acaraId))
      .groupBy(acara.id)
      .orderBy(desc(acara.tanggal));

    return result;
  } catch (error) {
    console.error("Database Error (getRecentAcara):", error);
    // Return empty array if table doesn't exist or connection fails
    return [];
  }
}

export default async function Home() {
  const listAcara = await getRecentAcara();

  return (
    <div className="min-h-screen bg-[#fdfaf6] font-sans selection:bg-[#8B5A2B] selection:text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#eaddd1]/30" style={{ backgroundImage: "radial-gradient(#d4c5b9 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fdfaf6] border border-[#d4c5b9] shadow-sm mb-8 text-[#8B5A2B] font-medium text-sm">
              <Coffee size={16} />
              <span>Dokumentasi Ngopi Bareng Kami</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#4A3728] tracking-tight mb-6">
              NGOPI DAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5A2B] to-[#b3855c]">SILATURAHMI</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-lg md:text-xl text-[#6b5847] leading-relaxed mb-12 max-w-2xl mx-auto">
              Merawat ukhuwah islamiyah melalui hangatnya secangkir kopi. Kepada Kopi: Kami mengimani bahwa secangkir kopi mampu menaklukkan sepi yang meraung dalam ruang hati paling sembunyi.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <a
              href="#dokumentasi"
              className="inline-flex items-center gap-2 bg-[#4A3728] hover:bg-[#3e2723] text-white px-8 py-4 rounded-full font-medium shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              Lihat Dokumentasi
              <ChevronDown size={20} className="animate-bounce" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* List Dokumentasi */}
      <section id="dokumentasi" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 border-t border-[#eaddd1]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#4A3728] mb-3">Ngopi Ngopi</h2>
                <p className="text-[#8B5A2B] font-medium">Rekam jejak ngopi bareng kami.</p>
              </div>
              <div className="hidden md:flex items-center justify-center w-16 h-16 bg-[#fdfaf6] rounded-full border border-[#d4c5b9] shadow-inner">
                <ImageIcon size={28} className="text-[#8B5A2B]" />
              </div>
            </div>
          </FadeIn>

          {listAcara.length === 0 ? (
            <ScaleUp>
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-[#d4c5b9] shadow-sm">
                <Coffee size={48} className="mx-auto text-[#d4c5b9] mb-4" />
                <h3 className="text-2xl font-bold text-[#4A3728] mb-2">Belum ada dokumentasi</h3>
                <p className="text-[#8B5A2B]">Admin belum menambahkan dokumentasi acara satupun.</p>
              </div>
            </ScaleUp>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listAcara.map((acara, index) => (
                <ScaleUp key={acara.id} delay={index * 0.1}>
                  <AcaraCard
                    id={acara.id}
                    judul={acara.judul}
                    coverUrl={acara.coverUrl}
                    tanggal={acara.tanggal}
                    pesertaCount={acara.pesertaCount}
                    kontenSnippet={acara.kontenHtml}
                  />
                </ScaleUp>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
