import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SeedProduct } from './dto/ProductSeeder.dto';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { UpdateProductDto } from './dto/UpdateProduct.dto';
import { Product } from './entities/products.entity';
import { In, Repository } from 'typeorm';
import { Category } from '../categories/entities/categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetProductsResponseDto } from './dto/GetProductsResponse.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productsOrmRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoriesOrmRepository: Repository<Category>,
  ) {}

  async getAllProducts(
    validPage: number,
    validLimit: number,
  ): Promise<GetProductsResponseDto[]> {
    const skip = (validPage - 1) * validLimit;
    const products = await this.productsOrmRepository.find({
      where: { isActive: true },
      relations: {
        category: true,
      },
      skip: skip,
      take: validLimit,
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imgUrl: product.imgUrl,
    }));
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productsOrmRepository.findOne({
      where: { id, isActive: true },
    });
    if (!product) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }
    return product;
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    const category = await this.categoriesOrmRepository.findOne({
      where: { id: product.categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `La categoría con id ${product.categoryId} no existe`,
      );
    }

    const newProduct = this.productsOrmRepository.create({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imgUrl: product.imgUrl,
      category,
    });
    return await this.productsOrmRepository.save(newProduct);
  }

  async updateProduct(
    id: string,
    productData: UpdateProductDto,
  ): Promise<string> {
    const product = await this.productsOrmRepository.findOne({
      where: { id, isActive: true },
    });

    if (!product) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }

    await this.productsOrmRepository.update(id, productData);
    return id;
  }

  async deleteProduct(id: string): Promise<{ message: string }> {
    const product = await this.productsOrmRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }

    if (!product.isActive) {
      throw new BadRequestException('El producto ya esta desactivado');
    }

    product.isActive = false;

    await this.productsOrmRepository.save(product);

    return { message: `Producto con id: ${id} desactivado correctamente` };
  }

  async addProducts(productsData: SeedProduct[]): Promise<Product[]> {
    const names = productsData.map((product) => product.name);

    const existingProducts = await this.productsOrmRepository.find({
      where: {
        name: In(names),
      },
    });

    const existingNames = existingProducts.map((product) => product.name);

    const productsToSave: Product[] = [];

    for (const productData of productsData) {
      if (existingNames.includes(productData.name)) continue;

      const category = await this.categoriesOrmRepository.findOne({
        where: { name: productData.category },
      });

      if (!category) continue;

      const newProduct = this.productsOrmRepository.create({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        imgUrl: productData.imgUrl,
        category,
      });

      productsToSave.push(newProduct);
    }
    if (!productsToSave.length) {
      return [];
    }

    return await this.productsOrmRepository.save(productsToSave);
  }
}
