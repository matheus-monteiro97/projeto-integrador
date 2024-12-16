import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './authService';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    const { email, senha } = body;
    
    try {
      const result = await this.authService.authLogin(email, senha);
      return result;
      
    } catch (error) {
      return {
        status: 'erro',
        message: error.message,
      };
    }
  }
}

