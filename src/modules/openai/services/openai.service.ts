import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import OpenAI from 'openai';
import { BodyType, Styles } from 'src/modules/user/entities/user.entity';
import { GetUserQuery } from 'src/modules/user/queries/impl/get-user.query';
import internal from 'stream';

@Injectable()
export class OpenaiService {
    private readonly openai: OpenAI;

    constructor(private readonly configService: ConfigService, private queryBus: QueryBus) {
        const openaiApiKey = this.configService.get('OPENAI_API_KEY');
        if (!openaiApiKey) {
            throw new Error('OPENAI_API_KEY not configured');
        }
        
        this.openai = new OpenAI({
            apiKey: openaiApiKey,
        });
    }

    async generateImage(args: { userId: string, stylePick: Styles }): Promise<any> {
        const { userId, stylePick } = args;
        
        const user = await this.queryBus.execute(
            new GetUserQuery({
                where: {
                    id: userId,
                },
            }),
        );

        if (!user) {
            throw new UnauthorizedException();
        }

        const gender = user.gender;
        const age = user.age;
        const height = user.height;
        const bodyType = user.bodyType;

        const prompt = `For ${gender} of age ${age}, height ${height} who has a ${bodyType} body shape, generate today's OOTD for ${stylePick} fashion style.`;

        try {
            const image = await this.openai.images.generate({ model: 'dall-e-3', prompt });
            return image.data;
          } catch (error) {
            throw new Error(`Failed to generate image: ${error.message}`);
          }
    }
}
