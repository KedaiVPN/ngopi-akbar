"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TiptapEditor from "@/components/admin/TiptapEditor";
import DynamicParticipantForm from "@/components/admin/DynamicParticipantForm";
import { UploadDropzone } from "@/lib/uploadthing";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CreateAcara() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [kontenHtml, setKontenHtml] = useState("");
  const [daftarPeserta, setDaftarPeserta] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!coverUrl) {
      setError("Silakan upload foto cover acara terlebih dahulu.");
      setLoading(false);
      return;
    }

    if (!kontenHtml || kontenHtml === "<p></p>") {
      setError("Deskripsi acara tidak boleh kosong.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/acara", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          judul,
          tanggal,
          coverUrl,
          kontenHtml,
          daftarPeserta: daftarPeserta.filter((p) => p.trim() !== ""),
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");

      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat menyimpan data acara.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin"
          className="p-2 bg-white text-[#8B5A2B] hover:bg-[#fdfaf6] border border-[#d4c5b9] rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-[#4A3728]">Tambah Acara Baru</h1>
          <p className="text-[#8B5A2B]">Buat dokumentasi Ngopi Akbar baru</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm border border-red-200 shadow-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-[#eaddd1]">

        {/* Info Dasar */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#4A3728]">Judul Acara</label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Contoh: Ngopi Akbar Edisi Maulid 2024"
              className="w-full px-4 py-2 border border-[#d4c5b9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#4A3728]">Tanggal Acara</label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full px-4 py-2 border border-[#d4c5b9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] transition-all"
              required
            />
          </div>
        </div>

        {/* Upload Cover */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#4A3728]">Foto Cover</label>
          {coverUrl ? (
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden border border-[#d4c5b9]">
              <Image
                src={coverUrl}
                alt="Cover Preview"
                fill
                className="object-cover"
                unoptimized
              />
              <button
                type="button"
                onClick={() => setCoverUrl("")}
                className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-red-600 transition-colors"
              >
                Ganti Foto
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-[#d4c5b9] rounded-lg p-6 bg-[#fdfaf6]">
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    setCoverUrl(res[0].url);
                  }
                }}
                onUploadError={(error: Error) => {
                  setError(`Gagal upload: ${error.message}`);
                }}
                appearance={{
                  label: "text-[#8B5A2B] hover:text-[#4A3728] transition-colors",
                  button: "bg-[#8B5A2B] hover:bg-[#6e4823] text-white",
                  uploadIcon: "text-[#d4c5b9]"
                }}
              />
            </div>
          )}
        </div>

        {/* Editor Konten */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#4A3728]">
            Deskripsi Acara <span className="text-[#8B5A2B] text-xs font-normal ml-2">(Mendukung tulisan Arab / RTL)</span>
          </label>
          <TiptapEditor content={kontenHtml} onChange={setKontenHtml} />
        </div>

        {/* Daftar Peserta */}
        <div className="pt-6 border-t border-[#eaddd1]">
          <DynamicParticipantForm participants={daftarPeserta} onChange={setDaftarPeserta} />
        </div>

        {/* Submit Button */}
        <div className="pt-6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#4A3728] hover:bg-[#3e2723] text-white font-medium px-8 py-3 rounded-lg shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            <span>{loading ? "Menyimpan..." : "Simpan Acara"}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
