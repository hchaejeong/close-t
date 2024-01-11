import { Module } from '@nestjs/common';
import { ClothesService } from './services/clothes.service';
import { ClothesController } from './clothes.controller';

@Module({
  controllers: [ClothesController],
  providers: [ClothesService],
})
export class ClothesModule {}
