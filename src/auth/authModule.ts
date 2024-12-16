import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './authService';
import { AuthController } from './authController';
import { ClienteService } from '../cliente/cliente.service';
import { FuncionarioService } from '../funcionario/funcionario.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, ClienteService, FuncionarioService],
  controllers: [AuthController],
})
export class AuthModule {}

