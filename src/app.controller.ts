import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@ApiTags('Application')
	@ApiOperation({ summary: 'heath check' })
	@ApiBearerAuth('JWT-auth')
	getHello(): string {
		return this.appService.getHello();
	}
}
