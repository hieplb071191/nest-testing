import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { UserModule } from '../admin/user/user.module';



const routers: Routes = [
	{
		path: 'admin',
		children: [
			{
				path: 'users',
				module: UserModule
			}
		],
	},
];

@Module({
	imports: [RouterModule.register(routers), UserModule],
})
export class AdminModule {}
