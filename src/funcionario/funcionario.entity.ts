import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('Funcionario')
export class Funcionario {
  @PrimaryColumn({ type: 'varchar', length: 14 })
  cpf: string;

  @Column({ type: 'varchar', length: 60 })
  nome: string;

  @Column({ type: 'varchar', length: 45 })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  senha: string;

  @Column({ type: 'char', length: 1 })
  sexo: string;

  @Column({ type: 'varchar', length: 15 })
  estadocivil: string;

  @Column({ type: 'date' })
  dataNasc: string;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  salario: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  comissao: number;

  @Column({ type: 'datetime' })
  dataAdm: string;

  @Column({ type: 'datetime', nullable: true })
  dataDem: string | null;
}