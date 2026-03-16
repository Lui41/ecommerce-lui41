import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Categories } from '../../categories/entities/categories.entity';
import { OrderDetails } from '../../orders/entities/orderdetails.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'PRODUCTS',
})
export class Products {

  @ApiProperty({
    description: 'Identificador único del producto',
    example: '9a4d7c11-8c91-4b33-9c2d-44f56e91b123',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Lenovo ThinkPad',
    maxLength: 50,
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Laptop empresarial con 16GB RAM y SSD de 512GB',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 2499.99,
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @ApiProperty({
    description: 'Cantidad disponible en inventario',
    example: 25,
  })
  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://example.com/product-image.jpg',
  })
  @Column({
    type: 'text',
    default:
      'https://us.123rf.com/450wm/momoforsale/momoforsale2105/momoforsale210500063/169348832-no-image-available-sign-isolated-on-white-background-vector-illustration.jpg',
  })
  imageURL: string;

  @ApiProperty({
    description: 'Categoría a la que pertenece el producto',
    type: () => Categories,
  })
  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ApiProperty({
    description: 'Lista de detalles de órdenes donde aparece el producto',
    type: () => [OrderDetails],
  })
  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}