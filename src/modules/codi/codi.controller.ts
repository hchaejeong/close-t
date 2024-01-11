import { Controller } from '@nestjs/common';
import { CodiService } from './services/codi.service';

@Controller('codi')
export class CodiController {
  constructor(private readonly codiService: CodiService) {}
}
