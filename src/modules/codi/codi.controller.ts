import { Controller, Get, Param, Patch } from '@nestjs/common';
import { CodiService } from './services/codi.service';

@Controller('codi')
export class CodiController {
  constructor(private readonly codiService: CodiService) {}

  @Get()
  public async getCodies() {

  }

  @Patch(':codiId/add/:clothesId')
  public async updateCodi(@Param('codiId') codiId: string, @Param('clothesId') clothesId: string) {
    
  }
}
