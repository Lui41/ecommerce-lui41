import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import productsData from '../utils/products.json';
import { Category } from './entities/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  getCategories(): Promise<Category[]> {
    return this.categoriesRepository.getCategories();
  }

  addCategories(): Promise<Category[]> {
    const categoryNames = productsData.map((product) => product.category);
    const uniqueCategories = [...new Set(categoryNames)];
    return this.categoriesRepository.addCategories(uniqueCategories);
  }
}
