import { memoryStorage } from 'multer';
import type { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { extname } from 'path';

export function imageMulterMemoryOptions(): MulterOptions {
  return {
    storage: memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024, files: 1 },
    fileFilter: (_req, file, cb) => {
      const okExt = ['.jpg', '.jpeg', '.png'];
      const okMime = ['image/jpeg', 'image/png'];
      const ext = extname(file.originalname).toLowerCase();
      okExt.includes(ext) && okMime.includes(file.mimetype)
        ? cb(null, true)
        : cb(new Error('Solo .jpg o .png'), false);
    },
  };
}
