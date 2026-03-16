import { allProducts } from "src/utils/productos";
import { Categories } from "../categories/entities/categories.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "src/products/entities/products.entity";
import { Repository } from "typeorm";
import { ProductsService } from "./products.service";

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private ormProductsRepository: Repository<Products>
  ) {}
  async getAllProducts(page: number, limit: number): Promise<Products[]> {
    const skip = (page - 1) * limit;
    const products = await this.ormProductsRepository.find({
      relations: {
        category: true,
      },
      skip: skip,
      take: limit,
    });
    return products;
  }

  async addProducts(): Promise<string> {
    const categories = await this.ormProductsRepository.manager.find( Categories, {
      select: {
        id: true,
        name: true,
      }
    });
    await Promise.all(
      allProducts.map(async (element) => {
        const category = categories.find(
          (category) => category.name === element.category,
        );
        if (!category) throw new Error(
          `La categoria ${element.category} no existe en la base de datos`
        );
        const product = new Products(); 
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = category; 
        await this.ormProductsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'stock', 'stock'], ['name'])
          .execute();
      })
    );
    return "Productos agregados exitosamente";
  }   
  
  async getProductsById(id: string): Promise<Products | string> {  
    const product = await this.ormProductsRepository.findOneBy({id});
    if (!product) return "Producto no encontrado";
    return product;
  }

  async updateProduct(
    id: string,
    productNewData: Partial<Products>,
  ): Promise<Products | null> { 
    await this.ormProductsRepository.update(id, productNewData);
    const updatedProduct = await this.ormProductsRepository.findOneBy({ id });
    return updatedProduct;
  }
  async deleteProduct(id: string): Promise<string | null> {
    const product = await this.ormProductsRepository.findOneBy({ id });
    if (!product) return null;
    await this.ormProductsRepository.delete(id);
    return product.id;
  }

  async updateProductImage(id: string, imageUrl: string) {

  const product = await this.ormProductsRepository.findOneBy({ id });

  if (!product) {
    throw new Error(`No existe producto con id ${id}`);
  }

  product.imageURL = imageUrl;

  await this.ormProductsRepository.save(product);

  return product;
}
}