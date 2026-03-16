import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ProductsRepository } from '../products/products.repository';

@Injectable()
export class FilesService {

  constructor(private productsRepository: ProductsRepository) {}

  async uploadImage(id: string, file: Express.Multer.File) {

    const upload = await new Promise<any>((resolve, reject) => {

      cloudinary.uploader.upload_stream(
        { folder: 'products' },
        (error, result) => {

          if (error) return reject(error);
          resolve(result);

        },
      ).end(file.buffer);

    });

    const imageUrl = upload.secure_url;

    // actualizar producto
    await this.productsRepository.updateProduct(id, { imageURL: imageUrl });

    return {
      message: 'Imagen subida correctamente',
      imageUrl,
    };

  }

}