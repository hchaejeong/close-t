import { Controller } from '@nestjs/common';
import { ClothesService } from './services/clothes.service';

@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}
}
