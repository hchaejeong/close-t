import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { BodyType, Styles, UserEntity } from '../entities/user.entity';
import { StringResponseDto } from 'src/modules/codi/dtos/string-response.dto';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async createUser(args: { id: string, name: string, email: string, profileImage: string, gender: string, age?: number, height?: number, bodyType?: BodyType, styles?: Styles[] }): Promise<UserEntity> {
        const { id, name, email, profileImage, gender, age, height, bodyType, styles } = args;
        
        const user = await this.userRepository.save(
            this.userRepository.create({
                id,
                name,
                email,
                profileImage,
                gender,
                age,
                height,
                bodyType,
                styles,
            }),
        );

        return user;
    }

    async updateUserProfile(args: { id: string, age: number, height: number, bodyType: BodyType }): Promise<UserEntity> {
        const { id, age, height, bodyType } = args;

        await this.userRepository.update(id, {
            age,
            height,
            bodyType,
        });

        const updatedUser = await this.userRepository.findOne({
            where: {
                id,
            },
        });

        return updatedUser;
    }

    async checkIfDetailNeeded(args: { id: string }): Promise<StringResponseDto> {
        const { id } = args;
        const user = await this.userRepository.findOne({
            where: {
                id,
            },
        });

        if (user.age != null && user.height != null && user.bodyType != null) {
            return { result: 'all informations are already present' };
        } else {
            return { result: 'need more information' };
        }
    }

    async checkUserExists(args: { id: string }): Promise<{ result: string }> {
        const { id } = args;

        const user = await this.userRepository.findOne({
            where: {
                id,
            },
        });

        if (!user) {
            return { result: 'new user' } ;
        } else {
            return { result: 'returning user' };
        }
    }

    async getProfile(args: { id: string }): Promise<UserEntity> {
        const { id } = args;
        
        const user = await this.userRepository.findOne({
            where: {
                id,
            },
        });

        return user;
    }
}
