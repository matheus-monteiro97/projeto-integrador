import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './cliente.entity';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClientModule {}
