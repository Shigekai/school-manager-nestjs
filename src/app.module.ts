import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoaService } from './service/pessoa.service';
import { PessoaController } from './controller/pessoa.controller';
@Module({
  imports: [],
  controllers: [AppController, PessoaController],
  providers: [AppService, PessoaService],
})
export class AppModule {}
