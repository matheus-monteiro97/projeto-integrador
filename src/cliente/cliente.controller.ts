import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  async consultarClientes() {
    const response = await this.clienteService.consultarClientes();
    return response;
  }

  @Get(':cpf')
  async consultarClientePorCPF(@Param('cpf') cpf: string) {
    const response = await this.clienteService.consultarClientePorCPF(cpf);
    return response;
  }

  @Post('inserir')
  async inserirCliente(@Body() cliente: any) {
    const response = await this.clienteService.inserirCliente(cliente);
    return response;
  }

  @Put('atualizar/:cpf')
  async atualizarCliente(@Param('cpf') cpf: string, @Body() cliente: any) {
    const response = await this.clienteService.atualizarCliente(cpf, cliente);
    return response;
  }

  @Delete('deletar/:cpf')
  async deletarCliente(@Param('cpf') cpf: string) {
    const response = await this.clienteService.deletarCliente(cpf);
    return response;
  }
}
