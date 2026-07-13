import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    @InjectRepository(Product)
    private readonly productsOrmRepository: Repository<Product>,
  ) {}

  async uploadImage(
    productId: string,
    file: Express.Multer.File,
  ): Promise<Product> {
    const product = await this.productsOrmRepository.findOneBy({
      id: productId,
    });
    if (!product)
      throw new NotFoundException(`Producto con id ${productId} no encontrado`);

    const response = await this.filesRepository.uploadImage(file);

    if (!response.secure_url)
      throw new NotFoundException('Cloudinary no pudo cargar la imágen');

    await this.productsOrmRepository.update(productId, {
      imgUrl: response.secure_url,
    });

    const updateProduct = await this.productsOrmRepository.findOneBy({
      id: productId,
    });

    if (!updateProduct) {
      throw new NotFoundException(
        `Producto con id ${productId} no encontrado luego de actualizar`,
      );
    }
    return updateProduct;
  }
}
