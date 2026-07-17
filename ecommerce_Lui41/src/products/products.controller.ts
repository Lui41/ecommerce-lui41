import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { UpdateProductDto } from './dto/UpdateProduct.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { GetProductsResponseDto } from './dto/GetProductsResponse.dto';
import { Product } from './entities/products.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'List products',
    description: 'Returns active products with pagination.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Records per page',
    example: 5,
  })
  @ApiOkResponse({
    description: 'Products list',
    type: GetProductsResponseDto,
    isArray: true,
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
  @ApiOperation({
    summary: 'Get product by id',
    description: 'Returns a single active product.',
  })
  @ApiOkResponse({
    description: 'Product found',
    type: Product,
  })
  getProductById(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productsService.getProductsById(id);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Create product',
    description: 'Creates a new product in a valid category. Admin only.',
  })
  @ApiCreatedResponse({
    description: 'Product created successfully',
    type: Product,
  })
  @ApiBadRequestResponse({
    description: 'Validation error or invalid category',
  })
  @ApiForbiddenResponse({
    description: 'Admin role required',
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(product);
  }

  @Post('seeder')
  @ApiOperation({
    summary: 'Seed products',
    description: 'Loads initial products from the local JSON file.',
  })
  @ApiCreatedResponse({
    description: 'Seed completed',
    type: Product,
    isArray: true,
  })
  seedProducts(): Promise<Product[]> {
    return this.productsService.addProducts();
  }

  @Put(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Update product',
    description: 'Updates a product by id. Admin only.',
  })
  @ApiOkResponse({
    description: 'Product updated successfully',
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productData: UpdateProductDto,
  ): Promise<string> {
    return this.productsService.updateProduct(id, productData);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Delete product',
    description: 'Soft deletes a product by id. Admin only.',
  })
  @ApiOkResponse({
    description: 'Product deleted successfully',
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteProduct(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string }> {
    return this.productsService.deleteProduct(id);
  }
}
