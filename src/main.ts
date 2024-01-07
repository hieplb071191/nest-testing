import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('ap/v1/', {
		exclude: [{
		  path: '*',
		  method: RequestMethod.ALL
		}]
	  })
	app.use(helmet());
	app.enableCors({
		origin: ['*'],
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	});
	const config = new DocumentBuilder()
		.setTitle('Nest-testing')
		.setDescription('The cats API description')
		.setVersion('1.0')
		.addApiKey()
		.addBearerAuth({
			in: 'header',
			type: 'http',
			scheme: 'Bearer',
			bearerFormat: 'Bearer',
			name: 'Authorization',
			description: 'Authorization access-token',
		})
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api-swagger', app, document);

	
	await app.listen(3000);
}
bootstrap();
