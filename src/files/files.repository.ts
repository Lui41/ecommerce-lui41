import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesRepository {

  async uploadImage(url: string) {
    return {
      message: 'Imagen subida correctamente',
      url,
    };
  }

}