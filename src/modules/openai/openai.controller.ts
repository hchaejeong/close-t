import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OpenaiService } from './services/openai.service';
import { Styles } from '../user/entities/user.entity';

@Controller(':userId/openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Get('generate-ootd')
  async generateOotdForToday(@Param('userId') userId: string, @Query() query: { stylePick: Styles }): Promise<any> {
    const { stylePick } = query;
    
    return await this.openaiService.generateImage({ userId, stylePick });
  }
}
