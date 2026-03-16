import {
  Controller,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {

  constructor(private readonly filesService: FilesService) {}

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id') id: string,

    @UploadedFile(
      new ParseFilePipe({
        validators: [

          new MaxFileSizeValidator({
            maxSize: 200000,
          }),

          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),

        ],

        exceptionFactory: (error) => {

          if (error.includes('file is too large')) {
            return new BadRequestException({
              statusCode: 400,
              message: 'La imagen se pasa de peso'
            });
          }

          return new BadRequestException({
            statusCode: 400,
            message: 'La imagen no es del tipo que esperamos'
          });

        },

      }),
    )
    file: Express.Multer.File,
  ) {
    return this.filesService.uploadImage(id, file);
  }
}