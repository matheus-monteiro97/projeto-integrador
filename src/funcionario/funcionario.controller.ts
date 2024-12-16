import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';

@Controller('funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Get()
  async consultarFuncionarios() {
    const response = await this.funcionarioService.consultarFuncionarios();
    return response;
  }

  @Get(':cpf')
  async consultarFuncionarioPorCPF(@Param('cpf') cpf: string) {
    const response = await this.funcionarioService.consultarFuncionarioPorCPF(cpf);
    return response;
  }

  @Post('inserir')
  async inserirFuncionario(@Body() funcionario: any) {
    const response = await this.funcionarioService.inserirFuncionario(funcionario);
    return response;
  }

  @Put('atualizar/:cpf')
  async atualizarFuncionario(@Param('cpf') cpf: string, @Body() funcionario: any) {
    const response = await this.funcionarioService.atualizarFuncionario(cpf, funcionario);
    return response;
  }

  @Delete('deletar/:cpf')
  async deletarFuncionario(@Param('cpf') cpf: string) {
    const response = await this.funcionarioService.deletarFuncionario(cpf);
    return response;
  }
}
