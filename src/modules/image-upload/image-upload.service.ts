import { Injectable } from '@nestjs/common';
import { rejects } from 'assert';
import { error } from 'console';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import * as path from 'path';

@Injectable()
export class ImageUploadService {
    async uploadImage(file: Express.Multer.File): Promise<string> {
        const fileName = new Date().getTime().toString() + '-' + file.originalname;
        //const absolutePath = path.join(__dirname, '..', `uploads/${fileName}`)
        //const path = `uploads/${fileName}`;
        const absolutePath = `/root/close-t_backend/src/modules/image-upload/uploads/${fileName}`;

        return new Promise((resolve, rejects) =>
            createWriteStream(absolutePath)
            .on('finish', () => resolve(absolutePath))
            .on('error', (error) => rejects(error))
            .end(file.buffer));
    }
}
