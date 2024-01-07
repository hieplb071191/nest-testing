import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly service: UserService
    ){}

    @ApiTags('admin/user')
    @Get()
    async getAllUSers() {

    }
}
