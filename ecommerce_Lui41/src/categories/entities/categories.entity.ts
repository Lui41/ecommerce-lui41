import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities/products.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'UUID V4 generado por la BBDD',
  })
  id!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  @ApiProperty({
    description: 'El nombre debe tener una longitud de hasta 50 caracteres',
    example: 'smartphone',
  })
  name!: string;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
