import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { BodyType, Styles, UserEntity } from '../entities/user.entity';

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
