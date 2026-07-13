import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { UpdateProductDto } from './dto/UpdateProduct.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { GetProductsResponseDto } from './dto/GetProductsResponse.dto';
import { Product } from './entities/products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
    description: 'Número de página',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
    description: 'Cantidad de registros por página',
  })
  getAllProducts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<GetProductsResponseDto[]> {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const validPage = !isNaN(pageNumber) && pageNumber > 0 ? pageNumber : 1;
    const validLimit = !isNaN(limitNumber) && limitNumber > 0 ? limitNumber : 5;

    return this.productsService.getAllProducts(validPage, validLimit);
  }

  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productsService.getProductsById(id);
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(product);
  }

  @Post('seeder')
  seedProducts(): Promise<Product[]> {
    return this.productsService.addProducts();
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productData: UpdateProductDto,
  ): Promise<string> {
    return this.productsService.updateProduct(id, productData);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  deleteProduct(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string }> {
    return this.productsService.deleteProduct(id);
  }
}
