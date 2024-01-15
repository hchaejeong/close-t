import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserRequestDto } from './dtos/create-user-request.dto';
import { GetProfileResponseDto } from './dtos/get-profile-response.dto';
import { CreateUserResponseDto } from './dtos/create-user-response.dto';
import { StringResponseDto } from '../codi/dtos/string-response.dto';
import { UpdateUserRequestDto } from './dtos/update-user-request.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId/profile')
  public async getProfile(@Param('userId') userId: string): Promise<GetProfileResponseDto> {
    const user = await this.userService.getProfile({ id: userId });

    return { name: user.name, gender: user.gender, email: user.email, profileImage: user.profileImage, age: user.age, height: user.height, bodyType: user.bodyType, styles: user.styles };
  }

  @Get(':userId/detailNeeded')
  public async checkIfDetailNeeded(@Param('userId') userId: string): Promise<StringResponseDto> {
    return await this.userService.checkIfDetailNeeded({ id: userId });
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

  @Patch(':userId/add-information')
  public async updateUserProfile(@Param('userId') userId: string, @Body() body: UpdateUserRequestDto): Promise<CreateUserResponseDto> {
    const { age, height, bodyType } = body;

    const user = await this.userService.updateUserProfile({ id: userId, age, height, bodyType });

    return { user };
  }
}
