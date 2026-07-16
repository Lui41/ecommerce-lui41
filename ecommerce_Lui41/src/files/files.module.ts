import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '../products/entities/products.entity';

import { FilesController } from './files.controller';
import { FilesRepository } from './files.repository';
import { FilesService } from './files.service';

import { CloudinaryConfig } from '../config/cloudinary';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryConfig, FilesRepository],
  exports: [FilesRepository],
})
export class FilesModule {}
