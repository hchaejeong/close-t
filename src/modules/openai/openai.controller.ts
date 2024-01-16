import { Controller, Get, Param, Query } from '@nestjs/common';
import { OpenaiService } from './services/openai.service';
import { GenerateOOTDRequestDto } from './dtos/generate-ootd-request.dto';
import { Styles } from '../user/entities/user.entity';

@Controller(':userId/openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Get('generateOOTD')
  public async generateOotdForToday(@Param('userId') userId: string, @Query('stylePick') stylePick: Styles): Promise<any> {
    //const { stylePick } = query;
    console.log(stylePick);
    
    return await this.openaiService.generateImage({ userId, stylePick });
  }
}
