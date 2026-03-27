import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "../src/db/schema";
import { nanoid } from "nanoid";

// Load environment variables manually
config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client, { schema });

async function main() {
  console.log("Seeding database...");

  try {
    const idAcara = nanoid();

    await db.insert(schema.acara).values({
      id: idAcara,
      judul: "Ngopi Akbar Edisi Maulid Nabi 1445 H",
      coverUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1600&auto=format&fit=crop",
      tanggal: new Date("2024-09-28"),
      createdAt: new Date(),
      kontenHtml: `
        <h2 style="text-align: center;">Ngopi dan Silaturahmi Rutin Tahunan</h2>
        <p>Alhamdulillah, pada kesempatan kali ini kita dapat berkumpul kembali dalam acara rutinan <strong>Ngopi Akbar</strong> yang bertepatan dengan momen peringatan Maulid Nabi Muhammad SAW.</p>

        <p style="text-align: center; font-size: 1.5em; line-height: 2;">
          <strong>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</strong>
        </p>

        <p style="text-align: center; font-size: 1.25em; line-height: 2;">
          مَنْ سَرَّهُ أَنْ يُبْسَطَ لَهُ فِي رِزْقِهِ، وَأَنْ يُنْسَأَ لَهُ فِي أَثَرِهِ، فَلْيَصِلْ رَحِمَهُ
        </p>

        <p><em>"Barangsiapa yang ingin diluaskan rezekinya dan dipanjangkan umurnya, maka hendaklah ia menyambung tali silaturahmi."</em> (HR. Bukhari & Muslim)</p>

        <p>Acara tahun ini dihadiri oleh banyak rekan sejawat dari berbagai daerah. Kita mengawali acara dengan pembacaan Maulid Diba', dilanjutkan dengan ramah tamah, diskusi ringan, dan tentunya menikmati hidangan kopi robusta khas nusantara.</p>

        <h3>Poin Penting Diskusi:</h3>
        <ul>
          <li>Meningkatkan kepedulian sosial antar anggota komunitas.</li>
          <li>Rencana program amal untuk panti asuhan di bulan Ramadhan mendatang.</li>
          <li>Jadwal pertemuan rutin bulanan dalam skala kecil.</li>
        </ul>

        <p>Terima kasih kepada seluruh panitia yang telah bekerja keras menyukseskan acara ini. Semoga ukhuwah kita terus terjalin hingga yaumil akhir.</p>
      `,
    });

    console.log("Acara seeded.");

    const daftarPeserta = [
      "Ahmad Faisal",
      "Budi Santoso",
      "Hendra Gunawan",
      "Muhammad Rizqi",
      "Zainudin",
      "Taufik Hidayat",
      "Reza Pahlevi",
      "Umar",
      "Hasan",
      "Husein"
    ];

    const pesertaValues = daftarPeserta.map((nama) => ({
      id: nanoid(),
      nama,
      acaraId: idAcara,
    }));

    await db.insert(schema.peserta).values(pesertaValues);

    console.log("Peserta seeded.");
    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit(0);
  }
}

main();
