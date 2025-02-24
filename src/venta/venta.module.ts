import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Zapato } from 'src/zapatos/entities/zapato.entity';

@Module({
  controllers: [VentaController],
  providers: [VentaService],
  imports:[TypeOrmModule.forFeature([Venta, Zapato])]
})
export class VentaModule {}
