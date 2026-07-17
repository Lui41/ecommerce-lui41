import { Controller, Get, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { Category } from './entities/categories.entity';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({
    summary: 'List categories',
    description: 'Returns all categories available in the system.',
  })
  @ApiOkResponse({
    description: 'Categories list',
    type: Category,
    isArray: true,
  })
  getCategories(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }

  @Post('seeder')
  @ApiOperation({
    summary: 'Seed categories',
    description: 'Creates categories based on the local product seed file.',
  })
  @ApiCreatedResponse({
    description: 'Categories seeded successfully',
    type: Category,
    isArray: true,
  })
  seedCategories(): Promise<Category[]> {
    return this.categoriesService.addCategories();
  }
}
