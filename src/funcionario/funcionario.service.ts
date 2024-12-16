import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class FuncionarioService {
  constructor(private readonly dataSource: DataSource) {}

  async consultarFuncionarios() {
    try {
      const result = await this.dataSource.query('CALL ConsultarFuncionarios()');
      const [response] = result;
      return response || [];
    } catch (error) {
      console.error('Erro ao consultar funcionários:', error);
      throw new Error('Erro ao consultar funcionários');
    }
  }

  async consultarFuncionarioPorCPF(cpf: string) {
    try {
      const result = await this.dataSource.query('CALL ConsultarFuncionarioPorCPF(?)', [cpf]);
      const [response] = result;

      if (response && response.length > 0) {
        return response[0];
      } else {
        throw new Error('Funcionário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao consultar funcionário:', error);
      throw new Error('Erro ao consultar funcionário');
    }
  }

  async inserirFuncionario(funcionario: any) {
    const {
      cpf,
      nome,
      email,
      senha,
      sexo,
      estadocivil,
      dataNasc,
      salario,
      comissao,
      dataAdm,
      dataDem,
    } = funcionario;

    try {
      const result = await this.dataSource.query(
        'CALL InserirFuncionario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [cpf, nome, email, senha, sexo, estadocivil, dataNasc, salario, comissao, dataAdm, dataDem],
      );

      const [response] = result;
      if (response && response[0]?.status === 'sucesso') {
        return { message: 'Funcionário inserido com sucesso', funcionario };
      } else {
        throw new Error('Erro ao inserir funcionário');
      }
    } catch (error) {
      console.error('Erro ao inserir funcionário:', error);
      throw new Error('Erro ao inserir funcionário');
    }
  }

  async atualizarFuncionario(cpf: string, funcionario: any) {
    const {
      nome,
      email,
      senha,
      sexo,
      estadocivil,
      dataNasc,
      salario,
      comissao,
      dataAdm,
      dataDem,
    } = funcionario;

    try {
      const result = await this.dataSource.query(
        'CALL AtualizarFuncionario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [cpf, nome, email, senha, sexo, estadocivil, dataNasc, salario, comissao, dataAdm, dataDem],
      );

      const [response] = result;
      if (response && response[0]?.status === 'sucesso') {
        return { message: 'Funcionário atualizado com sucesso', funcionario: { cpf, ...funcionario } };
      } else {
        throw new Error('Erro ao atualizar funcionário');
      }
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
      throw new Error('Erro ao atualizar funcionário');
    }
  }

  async deletarFuncionario(cpf: string) {
    try {
      const result = await this.dataSource.query('CALL DeletarFuncionario(?)', [cpf]);

      const [response] = result;
      if (response && response[0]?.status === 'sucesso') {
        return { message: 'Funcionário deletado com sucesso', cpf };
      } else {
        throw new Error('Erro ao deletar funcionário');
      }
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
      throw new Error('Erro ao deletar funcionário');
    }
  }
}

