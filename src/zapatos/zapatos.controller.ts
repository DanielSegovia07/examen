import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ZapatosService } from './zapatos.service';
import { CreateZapatoDto } from './dto/create-zapato.dto';
import { UpdateZapatoDto } from './dto/update-zapato.dto';
import { RestockZapatoDto } from './dto/restock-zapato.dto';

@Controller('zapatos')
export class ZapatosController {
  constructor(private readonly zapatosService: ZapatosService) {}

  @Post()
  create(@Body() createZapatoDto: CreateZapatoDto) {
    return this.zapatosService.create(createZapatoDto);
  }

  @Get()
  findAll() {
    return this.zapatosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zapatosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZapatoDto: UpdateZapatoDto) {
    return this.zapatosService.update(+id, updateZapatoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zapatosService.remove(+id);
  }

  @Post('restock')
    async restock(@Body() restockZapatoDto: RestockZapatoDto) {
        return await this.zapatosService.restock(restockZapatoDto);
    }
}
