import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async authLogin(email: string, senha: string) {
    try {
      const result = await this.dataSource.query(
        'SELECT LoginUser(?, ?) AS status', 
        [email, senha],
      );

      const status_message = result[0]?.status;

      if (status_message.includes('Erro:')) {
        throw new Error(status_message);
      }

      const payload = { email };
      const token = this.jwtService.sign(payload);

      return {
        status: status_message,
        token,
      };
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      throw new Error('Erro ao realizar login');
    }
  }
}
