import { Module } from '@nestjs/common';
import { OpenaiService } from './services/openai.service';
import { OpenaiController } from './openai.controller';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [ConfigModule, CqrsModule],
  controllers: [OpenaiController],
  providers: [OpenaiService],
})
export class OpenaiModule {}
