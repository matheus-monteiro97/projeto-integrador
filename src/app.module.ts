import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { ClientModule } from './cliente/cliente.module';
import { AuthModule } from './auth/authModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    FuncionarioModule,
    ClientModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

