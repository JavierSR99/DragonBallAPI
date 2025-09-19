import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, extname } from 'path';

export function persistImageBuffer(subdir: string, file: Express.Multer.File): string {
  const baseDir = join(process.cwd(), 'assets', 'images', subdir);
  if (!existsSync(baseDir)) mkdirSync(baseDir, { recursive: true });

  const ext = extname(file.originalname).toLowerCase();
  const base = file.originalname
    .replace(ext, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const filename = `${base}-${Date.now()}${ext}`;
  const fullpath = join(baseDir, filename);

  writeFileSync(fullpath, file.buffer);

  return `${subdir}/${filename}`;
}
