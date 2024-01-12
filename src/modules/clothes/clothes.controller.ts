import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClothesService } from './services/clothes.service';
import { GetClothesByCategoryRequestDto } from './dtos/get-clothes-by-category-request.dto';
import { GetClothesResponseDto } from './dtos/get-clothes-response.dto';
import { FilterClothesByTagRequestDto } from './dtos/filter-clothes-by-tag-request.dto';
import { GetSelectedClothesResponseDto } from './dtos/get-selected-clothes-response.dto';

@Controller(':userId/clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  @Get()
  public async getClothesByCategory(@Query() query: GetClothesByCategoryRequestDto): Promise<GetClothesResponseDto> {
    const { category } = query;

    const clothes = await this.clothesService.getClothesByCategory({ category });

    return { clothes };
  }

  @Get('filter')
  public async filterClothesByTag(@Query() query: FilterClothesByTagRequestDto): Promise<GetClothesResponseDto> {
    const { tag } = query;

    const clothes = await this.clothesService.filterClothesByTag({ tag });

    return { clothes };
  }

  @Get(':clothesId')
  public async getSelectedClothes(@Param('clothesId') clothesId: string): Promise<GetSelectedClothesResponseDto> {
    const selectedClothes = await this.clothesService.getSelectedClothes({ id: clothesId });

    return { selectedClothes };
  }
}
