import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { ClothesModule } from './modules/clothes';
import { CodiModule } from './modules/codi/codi.module';
import { DatabaseModule } from './modules/database/database.module';
import { OpenaiModule } from './modules/openai/openai.module';
import { ImageUploadModule } from './modules/image-upload/image-upload.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }), 
    OpenaiModule,
    UserModule,
    ClothesModule,
    CodiModule,
    ImageUploadModule,
    DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
