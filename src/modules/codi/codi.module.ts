import { Module } from '@nestjs/common';
import { CodiService } from './services/codi.service';
import { CodiController } from './codi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodiEntity } from './entities/codi.entity';
import { CodiRepository } from './repositories/codi.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { GetCodiesHandler } from './queries/handlers/get-codies.handler';
import { UpdateCodiHandler } from './queries/handlers/update-codi.handler';

@Module({
  imports: [TypeOrmModule.forFeature([CodiEntity, CodiRepository]), CqrsModule],
  controllers: [CodiController],
  providers: [CodiService, CodiRepository, GetCodiesHandler, UpdateCodiHandler],
  exports: [CodiService],
})
export class CodiModule {}
