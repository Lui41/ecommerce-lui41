import { allProducts } from "src/utils/productos";
import { Categories } from "./entities/categories.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private ormCategoriesRepository: Repository<Categories>
  ) {}

    async getAllCategories(): Promise<Categories[]> {
        return await this.ormCategoriesRepository.find();
    }

    async addCategory(): Promise<string> {
        const insertPromises = allProducts.map((element) => 
            this.ormCategoriesRepository
                .createQueryBuilder()
                .insert()
                .into(Categories)
                .values({
                    name: element.category
                })
                .orIgnore() // Evita insertar si ya existe una categoría con el mismo nombre
                .execute()
        );

        await Promise.all(insertPromises);
        return "Categorias agregadas exitosamente";
    }
}