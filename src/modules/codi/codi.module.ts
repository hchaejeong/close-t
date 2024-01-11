import { Module } from '@nestjs/common';
import { CodiService } from './services/codi.service';
import { CodiController } from './codi.controller';

@Module({
  controllers: [CodiController],
  providers: [CodiService],
})
export class CodiModule {}
