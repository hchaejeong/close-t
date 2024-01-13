import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CodiService } from './services/codi.service';
import { AddCommentRequestDto } from './dtos/add-comment-request.dto';
import { GetAllCodiesResponseDto } from './dtos/get-all-codies-response.dto';
import { GetSelectedCodiResponseDto } from './dtos/get-selected-codi-response.dto';
import { SaveCodiRequestDto } from './dtos/save-codi-request.dto';
import { StringResponseDto } from './dtos/string-response.dto';

@Controller(':userId/codi')
export class CodiController {
  constructor(private readonly codiService: CodiService) {}

  @Get()
  public async getCodies(@Param('userId') userId: string): Promise<GetAllCodiesResponseDto> {
    const codies = await this.codiService.getCodies({ userId });

    const codiIds = codies.map((codi) => codi.id);
    const likes = codies.map((codi) => codi.like);
    const clothesImages = codies.map((codi) => codi.clothesImages);

    return { codiIds, likes, clothesImageUrls: clothesImages };
  }

  @Post('save')
  public async saveCodi(@Param('userId') userId: string, @Body() body: SaveCodiRequestDto): Promise<StringResponseDto> {
    const { like, clothesIds, clothesImages, comment } = body;
    const styles = await this.codiService.getMainStylesFromClothes({ userId, clothesIds });

    return await this.codiService.saveCodi({ userId, styles, like, clothesIds, clothesImages, comment });
  }

  @Get(':codiId/view')
  public async getSelectedCodi(@Param('userId') userId: string, @Param('codiId') codiId: string): Promise<GetSelectedCodiResponseDto> {
    const { codi, links } = await this.codiService.getSelectedCodi({ userId, codiId });

    return { styles: codi.styles, clothesImages: codi.clothesImages, comment: codi.comment, like: codi.like, links };
  }

  @Patch(':codiId/add/:clothesId')
  public async updateCodi(@Param('userId') userId: string, @Param('codiId') codiId: string, @Param('clothesId') clothesId: string): Promise<StringResponseDto> {
    return await this.codiService.updateCodi({ userId, codiId, clothesId });
  }

  @Patch(':codiId/comment')
  public async addCommentToCodi(@Param('userId') userId: string, @Param('codiId') codiId: string, @Body() body: AddCommentRequestDto): Promise<StringResponseDto> {
    const { comment } = body;

    return await this.codiService.addComment({ userId, codiId, comment });
  }

  @Patch(':codiId/like')
  public async likeCodi(@Param('userId') userId: string, @Param('codiId') codiId: string): Promise<StringResponseDto> {
    return await this.codiService.likeOrDislikeCodi({ userId, codiId });
  }
}
