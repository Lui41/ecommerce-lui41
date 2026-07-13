import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/categories.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesOrmRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoriesOrmRepository.find();
  }

  async addCategories(names: string[]): Promise<Category[]> {
    const existingCategories = await this.categoriesOrmRepository.find({
      where: {
        name: In(names),
      },
    });

    const existingNames = existingCategories.map((category) => category.name);

    const newCategories = names
      .filter((name) => !existingNames.includes(name))
      .map((name) => this.categoriesOrmRepository.create({ name }));

    if (!newCategories.length) {
      return [];
    }

    return await this.categoriesOrmRepository.save(newCategories);
  }
}
