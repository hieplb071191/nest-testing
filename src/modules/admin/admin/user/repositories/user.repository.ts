import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/models/users.entity";
import { Repository } from "typeorm";
import dataSource from '../../../../../config/typeorm.config'
import { IUser } from "../interfaces/users.interface";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(Users)
        private readonly model: Repository<Users>
    ){}

    async findOneByQuery(query): Promise<Users> {
        const user =  await dataSource
            .getRepository(Users)
            .createQueryBuilder('u')
            .select()
            .leftJoinAndSelect('u.addresses', 'a')
            .where('u.email = :email',{email: query.email})
            .getOne()
        return user
    }

    async createUser(params) {
        const user = this.model.create(params)
        return this.model.save(user)
    }
}