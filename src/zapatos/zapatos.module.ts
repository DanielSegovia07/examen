import { Module } from '@nestjs/common';
import { ZapatosService } from './zapatos.service';
import { ZapatosController } from './zapatos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zapato } from './entities/zapato.entity';
import { Venta } from 'src/venta/entities/venta.entity';

@Module({
  controllers: [ZapatosController],
  providers: [ZapatosService],
  imports: [
    TypeOrmModule.forFeature([Zapato, Venta])
  ]
})
export class ZapatosModule {}
