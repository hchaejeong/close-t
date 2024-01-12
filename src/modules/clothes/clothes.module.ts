import { Module } from '@nestjs/common';
import { ClothesService } from './services/clothes.service';
import { ClothesController } from './clothes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetClothesHandler } from './queries/handlers/get-clothes.handler';
import { ClothesRepository } from './repositories/clothes.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { ClothesEntity } from './entities/clothes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClothesEntity, ClothesRepository]), CqrsModule],
  controllers: [ClothesController],
  providers: [ClothesService, GetClothesHandler, ClothesRepository],
  exports: [ClothesService],
})
export class ClothesModule {}
