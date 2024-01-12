import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserHandler } from './queries/handlers/get-user.handler';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRepository]), CqrsModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, GetUserHandler],
  exports: [UserService],
})
export class UserModule {}
