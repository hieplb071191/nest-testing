import { Injectable } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../../../models/users.entity";
import { Repository } from "typeorm";
import { IUser } from "src/modules/admin/admin/user/interfaces/users.interface";
import { Addresses } from "../../../models/address.entity";


@Injectable()
export class AuthRepository {
    constructor(
        @InjectRepository(Users)
        private readonly model: Repository<Users>,

        @InjectRepository(Addresses)
        private readonly addressModel: Repository<Users>,
    ){}

    async findUserByEmail(email: string, username:string) {
        const result = this.model
        .createQueryBuilder('u')
        .select()
        .addSelect(['a.lat', 'a.long', 'a.id', 'a.specifically'])
        .leftJoin('u.addresses', 'a')
        .where('u.email = :email',{email: email})
        .orWhere('u.username = :username', {username: username})
        .getOne()
        return result
    }

    async createUser(body): Promise<Users> {
        return await this.model.save(body)
    }

    async createAddress(body) {
        return await this.addressModel.save(body)
    }

}