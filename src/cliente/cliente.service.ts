import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ClienteService {
  constructor(private readonly dataSource: DataSource) {}

  async consultarClientes() {
    try {
      const result = await this.dataSource.query('CALL ConsultarClientes()');
      const [response] = result;
      return response || [];
    } catch (error) {
      console.error('Erro ao consultar clientes:', error);
      throw new Error('Erro ao consultar clientes');
    }
  }

  async consultarClientePorCPF(cpf: string) {
    try {
      const result = await this.dataSource.query('CALL ConsultarClientePorCPF(?)', [cpf]);
      const [response] = result;

      if (response && response.length > 0) {
        return response[0];
      } else {
        throw new Error('Cliente não encontrado');
      }
    } catch (error) {
      console.error('Erro ao consultar cliente:', error);
      throw new Error('Erro ao consultar cliente');
    }
  }

  async inserirCliente(cliente: any) {
    const {
      cpf,
      nome,
      sexo,
      email,
      senha,
      telefone,
      dataNasc,
    } = cliente;

    try {
      const result = await this.dataSource.query(
        'CALL InserirCliente(?, ?, ?, ?, ?, ?, ?)',
        [cpf, nome, sexo, email, senha, telefone, dataNasc],
      );

      const [response] = result;
      if (response && response[0]?.status === 'sucesso') {
        return { message: 'Cliente inserido com sucesso', cliente };
      } else {
        throw new Error('Erro ao inserir cliente');
      }
    } catch (error) {
      console.error('Erro ao inserir cliente:', error);
      throw new Error('Erro ao inserir cliente');
    }
  }

  async atualizarCliente(cpf: string, cliente: any) {
    const { nome, sexo, email, senha, telefone, dataNasc } = cliente;

    try {
      const result = await this.dataSource.query(
        'CALL AtualizarCliente(?, ?, ?, ?, ?, ?, ?)',
        [cpf, nome, sexo, email, senha, telefone, dataNasc],
      );

      const [response] = result;
      if (response && response[0]?.status === 'sucesso') {
        return { message: 'Cliente atualizado com sucesso', cliente: { cpf, ...cliente } };
      } else {
        throw new Error('Erro ao atualizar cliente');
      }
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw new Error('Erro ao atualizar cliente');
    }
  }

  async deletarCliente(cpf: string) {
    try {
      const result = await this.dataSource.query('CALL DeletarCliente(?)', [cpf]);

      const [response] = result;
      if (response && response[0]?.status === 'sucesso') {
        return { message: 'Cliente deletado com sucesso', cpf };
      } else {
        throw new Error('Erro ao deletar cliente');
      }
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      throw new Error('Erro ao deletar cliente');
    }
  }
}

