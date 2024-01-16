import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Response } from 'express';
import * as path from 'path';
import { fstat } from 'fs';
import * as fs from 'fs';

@Controller('images')
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  public async uploadImages(@UploadedFile() file: Express.Multer.File) {
    const filePath = await this.imageUploadService.uploadImage(file);
    const fileName = filePath.substring(55);
    console.log(fileName);

    return { imagePath: fileName };
  }

  @Get(':url')
  public async getImage(@Param('url') url: string, @Res() res: Response) {
    //const absolutePath = path.join(__dirname, 'uploads', url);
    //const absolutePath = `/root/close-t_backend/src/modules/image-upload/uploads/${url}`;
    try {
      //const absolutePath = path.join(__dirname, 'uploads', url);
      const absolutePath = `/root/close-t_backend/src/modules/image-upload/uploads/${url}`;

      if (fs.existsSync(absolutePath)) {
        return res.sendFile(absolutePath);
      } else {
        res.status(400).send('Image not found');
      }
    } catch (error) {
      console.error('Error reading file:', error);
      res.status(500).send('Internal server error');
    }
    //res.sendFile(url);
    //console.log('path', absolutePath);
    // const rootPath = '/root/close-t_backend/src/modules/image-upload/uploads'
    // try {
    //   if (fs.existsSync(url)) {
    //     return res.sendFile(url);
    //   } else {
    //     res.status(400).send('Image not found');
    //   }
    // } catch (error) {
    //   console.error('Error reading file:', error);
    //   res.status(500).send('Internal server error');
    // }
  }
}
