import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ClothesService } from './services/clothes.service';
import { GetClothesByCategoryRequestDto } from './dtos/get-clothes-by-category-request.dto';
import { GetClothesResponseDto } from './dtos/get-clothes-response.dto';
import { FilterClothesByTagRequestDto } from './dtos/filter-clothes-by-tag-request.dto';
import { GetSelectedClothesResponseDto } from './dtos/get-selected-clothes-response.dto';
import { Tag } from './entities/clothes.entity';
import { StringResponseDto } from '../codi/dtos/string-response.dto';
import { AddClothesRequestDto } from './dtos/add-clothes-request.dto';

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

  @Post('add')
  public async addClothes(@Param('userId') userId: string, @Body() body: AddClothesRequestDto): Promise<StringResponseDto> {
    const { category, styles, tag, imageUrl, link } = body;

    return await this.clothesService.addClothes({
      category,
      styles,
      tag,
      imageUrl,
      link,
      userId,
    });
  }

  @Patch(':clothesId/changeLike')
  public async likeOrDislikeClothes(@Param('userId') userId: string, @Param('clothesId') clothesId: string): Promise<StringResponseDto> {
    return await this.clothesService.likeOrDislikeClothes({ clothesId, userId });
  }

  @Patch(':clothesId/changeTrash')
  public async trashOrRestoreClothes(@Param('userId') userId: string, @Param('clothesId') clothesId: string): Promise<StringResponseDto> {
    return await this.clothesService.trashOrRestoreClothes({ clothesId, userId });
  }

  @Patch(':clothesId/removeFromWish')
  public async removeFromWish(@Param('userId') userId: string, @Param('clothesId') clothesId: string): Promise<StringResponseDto> {
    return await this.clothesService.removeFromWish({ clothesId, userId });
  }

  @Delete(':clothesId/remove')
  public async removeClothes(@Param('userId') userId: string, @Param('clothesId') clothesId: string): Promise<StringResponseDto> {
    return await this.clothesService.removeClothes({ clothesId, userId });
  }
}
