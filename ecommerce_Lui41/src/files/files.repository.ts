import { Injectable } from '@nestjs/common';
import toStream from 'buffer-to-stream';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class FilesRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            console.error('ERROR REAL DE CLOUDINARY:', error);
            return reject(new Error(JSON.stringify(error)));
          } else if (!result) {
            return reject(new Error('Cloudinary no devolvió resultado'));
          } else {
            resolve(result);
          }
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}
