import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('Cliente')
export class Client {
  @PrimaryColumn({ length: 14 })
  cpf: string;

  @Column({ length: 45 })
  nome: string;

  @Column({ length: 1 })
  sexo: string;

  @Column({ length: 45 })
  email: string;

  @Column({ length: 15 })
  senha: string;

  @Column({ length: 15 })
  telefone: string;

  @Column('date')
  dataNasc: Date;
}