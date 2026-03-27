import { NextResponse } from 'next/server';
import { db } from '@/db';
import { acara, peserta, galeri } from '@/db/schema';
import { nanoid } from 'nanoid';
import { desc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    const listAcara = await db.select().from(acara).orderBy(desc(acara.tanggal));
    return NextResponse.json(listAcara);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session');

    if (!sessionCookie || sessionCookie.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { judul, coverUrl, kontenHtml, tanggal, daftarPeserta, galeriUrls } = body;

    const id = nanoid();

    // Insert acara
    await db.insert(acara).values({
      id,
      judul,
      coverUrl,
      kontenHtml,
      tanggal: new Date(tanggal),
      createdAt: new Date(),
    });

    // Insert peserta
    if (daftarPeserta && daftarPeserta.length > 0) {
      const pesertaValues = daftarPeserta.map((nama: string) => ({
        id: nanoid(),
        nama,
        acaraId: id,
      }));
      await db.insert(peserta).values(pesertaValues);
    }

    // Insert galeri
    if (galeriUrls && galeriUrls.length > 0) {
      const galeriValues = galeriUrls.map((url: string) => ({
        id: nanoid(),
        url,
        acaraId: id,
      }));
      await db.insert(galeri).values(galeriValues);
    }

    return NextResponse.json({ id, message: 'Acara berhasil dibuat' });
  } catch (error) {
    console.error('Error creating acara:', error);
    return NextResponse.json({ error: 'Gagal membuat acara' }, { status: 500 });
  }
}
