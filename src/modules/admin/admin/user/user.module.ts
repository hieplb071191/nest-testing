import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/models/users.entity';
import { Addresses } from 'src/models/address.entity';
import { UserService } from './user.service';
import { Posts } from 'src/models/posts.entity';
import { Comments } from 'src/models/comments.entity';
import { Ratings } from 'src/models/rating.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users, Addresses, Posts, Comments, Ratings])
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
