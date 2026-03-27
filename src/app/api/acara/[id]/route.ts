import { NextResponse } from 'next/server';
import { db } from '@/db';
import { acara, peserta } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const dataAcara = await db.select().from(acara).where(eq(acara.id, id)).get();

    if (!dataAcara) {
      return NextResponse.json({ error: 'Acara tidak ditemukan' }, { status: 404 });
    }

    const dataPeserta = await db.select().from(peserta).where(eq(peserta.acaraId, id));

    return NextResponse.json({ ...dataAcara, peserta: dataPeserta });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data acara' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { judul, coverUrl, kontenHtml, tanggal, daftarPeserta } = body;

    // Update acara
    await db.update(acara).set({
      judul,
      coverUrl,
      kontenHtml,
      tanggal: new Date(tanggal),
    }).where(eq(acara.id, id));

    // Update peserta (delete existing and insert new)
    await db.delete(peserta).where(eq(peserta.acaraId, id));

    if (daftarPeserta && daftarPeserta.length > 0) {
      const pesertaValues = daftarPeserta.map((nama: string) => ({
        id: nanoid(),
        nama,
        acaraId: id,
      }));
      await db.insert(peserta).values(pesertaValues);
    }

    return NextResponse.json({ message: 'Acara berhasil diupdate' });
  } catch (error) {
    console.error('Error updating acara:', error);
    return NextResponse.json({ error: 'Gagal mengupdate acara' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await db.delete(acara).where(eq(acara.id, id));
    return NextResponse.json({ message: 'Acara berhasil dihapus' });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus acara' }, { status: 500 });
  }
}
