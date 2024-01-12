import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClothesService } from './services/clothes.service';
import { GetClothesByCategoryRequestDto } from './dtos/get-clothes-by-category-request.dto';
import { GetClothesResponseDto } from './dtos/get-clothes-response.dto';
import { FilterClothesByTagRequestDto } from './dtos/filter-clothes-by-tag-request.dto';
import { GetSelectedClothesResponseDto } from './dtos/get-selected-clothes-response.dto';
import { Tag } from './entities/clothes.entity';

@Controller(':userId/clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  @Get()
  public async getClothesByCategory(@Param('userId') userId: string, @Query() query: GetClothesByCategoryRequestDto): Promise<GetClothesResponseDto> {
    const { category } = query;

    const clothes = await this.clothesService.getClothesByCategory({ category, userId });

    return { clothes };
  }

  @Get('filter/:tag')
  public async filterClothesByTag(@Param('userId') userId: string, @Param('tag') tag: Tag, @Query() query: GetClothesByCategoryRequestDto): Promise<GetClothesResponseDto> {
    const { category } = query;

    const clothes = await this.clothesService.filterClothesByTag({ tag, category, userId });

    return { clothes };
  }

  @Get(':clothesId')
  public async getSelectedClothes(@Param('userId') userId: string, @Param('clothesId') clothesId: string): Promise<GetSelectedClothesResponseDto> {
    const selectedClothes = await this.clothesService.getSelectedClothes({ id: clothesId, userId });

    return { selectedClothes };
  }
}
