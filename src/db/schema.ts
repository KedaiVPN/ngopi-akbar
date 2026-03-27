import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const acara = sqliteTable('acara', {
  id: text('id').primaryKey(), // using nanoid
  judul: text('judul').notNull(),
  coverUrl: text('cover_url').notNull(),
  kontenHtml: text('konten_html').notNull(),
  tanggal: integer('tanggal', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const peserta = sqliteTable('peserta', {
  id: text('id').primaryKey(), // using nanoid
  nama: text('nama').notNull(),
  acaraId: text('acara_id').notNull().references(() => acara.id, { onDelete: 'cascade' }),
});
