import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Calendar, Users, FileText } from "lucide-react";
import { db } from "@/db";
import { acara, peserta } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import DeleteButton from "@/components/admin/DeleteButton";

async function getAcaraList() {
  const result = await db
    .select({
      id: acara.id,
      judul: acara.judul,
      tanggal: acara.tanggal,
      coverUrl: acara.coverUrl,
      pesertaCount: sql<number>`count(${peserta.id})`.mapWith(Number),
    })
    .from(acara)
    .leftJoin(peserta, eq(acara.id, peserta.acaraId))
    .groupBy(acara.id)
    .orderBy(desc(acara.tanggal));

  return result;
}

export default async function AdminDashboard() {
  const acaraList = await getAcaraList();

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#4A3728]">Dashboard Admin</h1>
          <p className="text-[#8B5A2B] mt-1">Kelola dokumentasi Ngopi Akbar</p>
        </div>

        <Link
          href="/admin/acara/create"
          className="inline-flex items-center justify-center gap-2 bg-[#8B5A2B] hover:bg-[#6e4823] text-white px-6 py-2.5 rounded-lg shadow-sm font-medium transition-all w-full md:w-auto"
        >
          <Plus size={20} />
          <span>Tambah Acara</span>
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl border border-[#d4c5b9] shadow-sm flex items-center gap-4">
          <div className="p-4 bg-[#fdfaf6] rounded-lg text-[#8B5A2B]">
            <FileText size={32} />
          </div>
          <div>
            <p className="text-sm font-medium text-[#4A3728]/70">Total Acara</p>
            <p className="text-3xl font-bold text-[#4A3728]">{acaraList.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-[#d4c5b9] shadow-sm flex items-center gap-4">
          <div className="p-4 bg-[#fdfaf6] rounded-lg text-[#8B5A2B]">
            <Users size={32} />
          </div>
          <div>
            <p className="text-sm font-medium text-[#4A3728]/70">Total Peserta Terdaftar</p>
            <p className="text-3xl font-bold text-[#4A3728]">
              {acaraList.reduce((acc, curr) => acc + curr.pesertaCount, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* List Acara */}
      <div className="bg-white rounded-xl border border-[#d4c5b9] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#d4c5b9] bg-[#fdfaf6]">
          <h2 className="text-lg font-bold text-[#4A3728]">Daftar Dokumentasi</h2>
        </div>

        {acaraList.length === 0 ? (
          <div className="p-12 text-center text-[#8B5A2B]">
            <p className="mb-4">Belum ada acara yang didokumentasikan.</p>
            <Link
              href="/admin/acara/create"
              className="text-[#4A3728] font-medium hover:underline inline-flex items-center gap-1"
            >
              <Plus size={16} /> Buat Acara Pertama
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#d4c5b9] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fdfaf6]/50">
                  <th className="py-4 px-6 text-sm font-semibold text-[#4A3728]">Cover</th>
                  <th className="py-4 px-6 text-sm font-semibold text-[#4A3728]">Judul Acara</th>
                  <th className="py-4 px-6 text-sm font-semibold text-[#4A3728]">Tanggal</th>
                  <th className="py-4 px-6 text-sm font-semibold text-[#4A3728]">Peserta</th>
                  <th className="py-4 px-6 text-sm font-semibold text-[#4A3728] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d4c5b9]">
                {acaraList.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fdfaf6]/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="relative w-16 h-12 rounded overflow-hidden border border-[#d4c5b9]">
                        <Image src={item.coverUrl} alt={item.judul} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-[#4A3728]">{item.judul}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-[#8B5A2B]">
                        <Calendar size={14} />
                        {format(new Date(item.tanggal), 'dd MMMM yyyy', { locale: localeId })}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#8B5A2B]">
                      {item.pesertaCount} orang
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/acara/${item.id}`}
                          className="p-2 text-[#8B5A2B] hover:text-[#4A3728] hover:bg-[#eaddd1] rounded transition-colors"
                          title="Edit Acara"
                        >
                          <Edit size={18} />
                        </Link>
                        <DeleteButton id={item.id} title={item.judul} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
