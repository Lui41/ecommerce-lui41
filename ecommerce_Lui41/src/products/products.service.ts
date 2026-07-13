import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import productsData from '../utils/products.json';
import { SeedProduct } from './dto/ProductSeeder.dto';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { UpdateProductDto } from './dto/UpdateProduct.dto';
import { GetProductsResponseDto } from './dto/GetProductsResponse.dto';
import { Product } from './entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getAllProducts(
    validPage: number,
    validLimit: number,
  ): Promise<GetProductsResponseDto[]> {
    return this.productsRepository.getAllProducts(validPage, validLimit);
  }

  getProductsById(id: string): Promise<Product> {
    return this.productsRepository.getProductById(id);
  }

  createProduct(product: CreateProductDto): Promise<Product> {
    return this.productsRepository.createProduct(product);
  }

  updateProduct(id: string, productData: UpdateProductDto): Promise<string> {
    return this.productsRepository.updateProduct(id, productData);
  }

  deleteProduct(id: string): Promise<{ message: string }> {
    return this.productsRepository.deleteProduct(id);
  }

  addProducts(): Promise<Product[]> {
    return this.productsRepository.addProducts(productsData as SeedProduct[]);
  }
}
