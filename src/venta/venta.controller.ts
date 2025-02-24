import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VentaService } from './venta.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { FiltroVentasDto } from './dto/FiltroVentasDto.dto';

@Controller('venta')

export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  @Post()
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventaService.create(createVentaDto);
  }

  @Get('ventaDetalles')  
  findAlld(@Query() filtros: FiltroVentasDto) {
    return this.ventaService.findAlld(filtros);
  }

  @Get()
  findAll() {
    return this.ventaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ventaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventaService.update(+id, updateVentaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ventaService.remove(+id);
  }


}
