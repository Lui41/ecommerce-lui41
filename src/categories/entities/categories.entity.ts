import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'; // Importamos decoradores de TypeORM para definir columnas y relaciones

import { Products } from '../../products/entities/products.entity'; // Importamos la entidad Products porque una categoría puede tener muchos productos

@Entity({
  name: 'CATEGORIES', // Nombre de la tabla en la base de datos
})
export class Categories {

  @PrimaryGeneratedColumn('uuid') 
  // Crea la clave primaria de la tabla
  // Se genera automáticamente un UUID único para cada categoría

  id: string; 
  // Variable que almacenará el id único de la categoría

  @Column({
    type: 'varchar', // Tipo texto
    length: 50, // Máximo 50 caracteres
    nullable: false, // Campo obligatorio
    unique: true, // No permite categorías repetidas
  })
  name: string; 
  // Nombre de la categoría (Ej: tecnología, ropa, videojuegos)

  @OneToMany(() => Products, (product) => product.category)
  // Relación uno a muchos
  // Una categoría puede tener muchos productos
  // product.category hace referencia al campo category dentro de Products

  products: Products[]; 
  // Aquí se almacenará un arreglo con todos los productos de esta categoría
}