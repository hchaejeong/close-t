import { Injectable } from '@nestjs/common';
import { CodiRepository } from '../repositories/codi.repository';
import { Styles } from 'src/modules/user/entities/user.entity';

@Injectable()
export class CodiService {
    constructor(private codiRepository: CodiRepository) {}

    async updateCodi(args: { codiId: string, clothesId: string, styles: Styles[] }) {
        const { codiId, clothesId, styles } = args;

    }
}
