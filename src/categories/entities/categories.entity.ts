import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Products } from '../../products/entities/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'CATEGORIES' })
export class Categories {

  @ApiProperty({
    example: 'uuid-category'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Tecnología'
  })
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  name: string;

  @ApiProperty({
    description: 'Productos de la categoría',
    type: () => [Products]
  })
  @OneToMany(() => Products, (product) => product.category)
  products: Products[];
}