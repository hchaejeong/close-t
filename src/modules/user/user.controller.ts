import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserRequestDto } from './dtos/create-user-request.dto';
import { GetProfileResponseDto } from './dtos/get-profile-response.dto';
import { CreateUserResponseDto } from './dtos/create-user-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId/profile')
  public async getProfile(@Param('userId') userId: string): Promise<GetProfileResponseDto> {
    const user = await this.userService.getProfile({ id: userId });

    return { name: user.name, gender: user.gender, email: user.email, profileImage: user.profileImage };
  }

  @Get(':userId/check')
  public async checkUserExists(@Param('userId') userId: string): Promise<{ result: string }> {
    return await this.userService.checkUserExists({ id: userId });
  }

  @Post('create')
  public async createUser(@Body() body: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const { id, name, email, profileImage, gender, age, height, bodyType, styles } = body;
    
    const user = await this.userService.createUser({ id, name, email, profileImage, gender, age, height, bodyType, styles });

    return { user }; 
  }
}
