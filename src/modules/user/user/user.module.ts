import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';

const routers: Routes = [
	{
		path: 'user',
		children: [],
	},
];
@Module({
	imports: [RouterModule.register(routers)],
})
export class UserModule {}
