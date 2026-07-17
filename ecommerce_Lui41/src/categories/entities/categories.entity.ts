import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities/products.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Category UUID v4',
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  })
  id!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  @ApiProperty({
    description: 'Category name',
    example: 'smartphone',
  })
  name!: string;

  @OneToMany(() => Product, (product) => product.category)
  @ApiProperty({
    description: 'Products linked to the category',
    type: () => [Product],
  })
  products!: Product[];
}
