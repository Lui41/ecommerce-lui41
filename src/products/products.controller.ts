import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from 'src/products/entities/products.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(
    @Query('page') page: string,
    @Query('limit') limit: string
  ) {
    if (page && limit) {
      return this.productsService.getAllProducts(
        Number(page),
        Number(limit)
      );
    }

    return this.productsService.getAllProducts(
      Number(1),
      Number(5)
    );
  }

  @Get('seeder')
  addProducts() {
    return this.productsService.addProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  updateProduct(
    @Param('id') id: string,
    @Body() productNewData: Products
  ) {
    return this.productsService.updateProduct(id, productNewData);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
