import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClothesService } from './services/clothes.service';
import { GetClothesByCategoryRequestDto } from './dtos/get-clothes-by-category-request.dto';
import { GetClothesResponseDto } from './dtos/get-clothes-response.dto';
import { GetSelectedClothesResponseDto } from './dtos/get-selected-clothes-response.dto';
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

  @Get('liked')
  public async getLikedClothes(@Param('userId') userId: string, @Query() query: GetClothesByCategoryRequestDto): Promise<GetClothesResponseDto> {
    const { category } = query;

    const likedClothes = await this.clothesService.getLikedClothes({ id: userId, category });

    return { clothes: likedClothes };
  }

  @Get('trashed')
  public async getTrashedClothes(@Param('userId') userId: string, @Query() query: GetClothesByCategoryRequestDto): Promise<GetClothesResponseDto> {
    const { category } = query;

    const trashedClothes = await this.clothesService.getTrashedClothes({ id: userId, category });

    return { clothes: trashedClothes };
  }

  @Get('wished')
  public async getWishedClothes(@Param('userId') userId: string, @Query() query: GetClothesByCategoryRequestDto): Promise<GetClothesResponseDto> {
    const { category } = query;

    const wishedClothes = await this.clothesService.getWishedClothes({ id: userId, category });

    return { clothes: wishedClothes };
  }

  @Get(':clothesId')
  public async getSelectedClothes(@Param('userId') userId: string, @Param('clothesId') clothesId: string): Promise<GetSelectedClothesResponseDto> {
    const selectedClothes = await this.clothesService.getSelectedClothes({ id: clothesId, userId });

    return { selectedClothes };
  }

  @Post('add')
  public async addClothes(@Param('userId') userId: string, @Body() body: AddClothesRequestDto): Promise<StringResponseDto> {
    const { category, styles, like, wish, trash, imageUrl, link } = body;

    return await this.clothesService.addClothes({
      category,
      styles,
      like,
      trash,
      wish,
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
