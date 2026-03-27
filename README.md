# NGOPI AKBAR

Aplikasi website fullstack berbasis Next.js untuk dokumentasi acara rutinan tahunan "NGOPI AKBAR" (Ngopi dan Silaturahmi).

## Fitur
1. **Landing Page:** Menampilkan daftar acara terbaru dengan desain bernuansa kopi.
2. **Detail Konten:** Menampilkan deskripsi lengkap acara, galeri, dan daftar peserta. Mendukung teks campuran Alfabet (Latin) dan tulisan Arab (RTL) menggunakan TipTap editor.
3. **Admin Dashboard (CMS):** Sistem login sederhana untuk admin.
4. **Editor Acara:** Pembuatan acara baru atau edit dengan dukungan Upload foto (UploadThing) dan pengisian daftar peserta yang dinamis.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Turso (Serverless SQLite)
- **ORM:** Drizzle ORM
- **Storage:** UploadThing (Untuk foto acara)
- **Rich Text Editor:** TipTap (Mendukung text-align dan RTL/Arabic)

## Persiapan & Prasyarat
Sebelum menjalankan project ini, Anda perlu membuat akun dan mendapatkan API Key dari layanan berikut:
1. **Turso** (Database): Buat database baru di [Turso](https://turso.tech) dan dapatkan `TURSO_DATABASE_URL` serta `TURSO_AUTH_TOKEN`.
2. **UploadThing** (Storage Gambar): Buat project baru di [UploadThing](https://uploadthing.com) dan dapatkan `UPLOADTHING_TOKEN`.

## Setup Lokal

1. **Clone repository ini**
   \`\`\`bash
   git clone <url-repo-anda>
   cd ngopi-akbar
   \`\`\`

2. **Install dependensi**
   \`\`\`bash
   npm install
   \`\`\`

3. **Atur Environment Variables**
   Salin file `.env.example` menjadi `.env` dan isi dengan kredensial Anda:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Isi file `.env` dengan kredensial Turso, UploadThing, dan kredensial admin Anda.

4. **Setup Database & Migrasi**
   Gunakan perintah ini untuk mem-push skema database Anda ke Turso:
   \`\`\`bash
   npm run db:push
   \`\`\`

5. **(Opsional) Isi Data Dummy**
   Untuk memudahkan pengujian awal, jalankan seeder untuk mengisi 1 acara beserta contoh data pesertanya:
   \`\`\`bash
   npm run db:seed
   \`\`\`

6. **Jalankan Aplikasi**
   \`\`\`bash
   npm run dev
   \`\`\`
   Buka `http://localhost:3000` di browser Anda.

   Untuk masuk ke halaman Admin, buka `http://localhost:3000/admin` dan login dengan username/password yang telah Anda tentukan di `.env` (default: `admin` / `rahasia`).

## Struktur Folder Utama
- \`/src/app\`: Direktori rute utama aplikasi (App Router Next.js).
  - \`/src/app/page.tsx\`: Landing page publik.
  - \`/src/app/acara/[id]\`: Halaman detail acara.
  - \`/src/app/admin\`: Halaman CMS dashboard.
  - \`/src/app/admin/login\`: Halaman login admin.
  - \`/src/app/api\`: API Routes untuk UploadThing dan CRUD Acara.
- \`/src/components\`: Komponen React yang digunakan berulang.
  - \`/src/components/admin\`: Komponen khusus CMS (seperti TiptapEditor dan Form Dinamis).
  - \`/src/components/public\`: Komponen untuk sisi publik (Header, Footer, Card).
- \`/src/db\`: Konfigurasi Drizzle ORM dan skema database.
- \`/src/lib\`: Fungsi utilitas (UploadThing dll).
- \`/scripts\`: Script utilitas seperti database seeder.

## Panduan Deployment ke Vercel

Aplikasi ini sudah dioptimasi untuk deployment ke Vercel (Serverless ready).

1. Push kode Anda ke repository GitHub.
2. Login ke [Vercel](https://vercel.com) dan klik "Add New Project".
3. Import repository GitHub Anda.
4. Di bagian **Environment Variables**, tambahkan seluruh variabel yang ada di file `.env` Anda:
   - \`TURSO_DATABASE_URL\`
   - \`TURSO_AUTH_TOKEN\`
   - \`UPLOADTHING_TOKEN\`
   - \`ADMIN_USERNAME\`
   - \`ADMIN_PASSWORD\`
5. Klik **Deploy** dan tunggu proses selesai.

Selamat! Web Dokumentasi Ngopi Akbar Anda telah online!
