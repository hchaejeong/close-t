import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserRequestDto } from './dtos/create-user-request.dto';
import { GetProfileResponseDto } from './dtos/get-profile-response.dto';
import { CreateUserResponseDto } from './dtos/create-user-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  public async getProfile(@Param('userId') userId: string): Promise<GetProfileResponseDto> {
    const user = await this.userService.getProfile({ id: userId });

    return { name: user.name, gender: user.gender };
  }

  @Post()
  public async createUser(@Body() body: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const { id, name, gender, age, height, bodyType, styles } = body;
    
    const user = await this.userService.createUser({ id, name, gender, age, height, bodyType, styles });

    return { user }; 
  }
}
