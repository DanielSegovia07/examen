import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { Zapato } from 'src/zapatos/entities/zapato.entity';
import { FiltroVentasDto } from './dto/FiltroVentasDto.dto';  

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    @InjectRepository(Zapato)
    private readonly zapatoRepository: Repository<Zapato>,
  ) {}

  
  async create(createVentaDto: CreateVentaDto) {
    const { zapatoId, cantidad } = createVentaDto;

    const zapato = await this.zapatoRepository.findOne({ where: { id: zapatoId } });

    if (!zapato) {
      throw new NotFoundException(`Zapato con ID ${zapatoId} no encontrado`);
    }

    if (zapato.stock < cantidad) {
      throw new BadRequestException('No hay suficiente stock para completar la venta');
    }

    const total = zapato.precio * cantidad;

    zapato.stock -= cantidad;
    await this.zapatoRepository.save(zapato); 

    const venta = this.ventaRepository.create({
      zapato: { id: zapatoId }, 
      cantidad,
      total,
    });

    await this.ventaRepository.save(venta); 

    return venta;
  }


  async findAll() {
    const ventas = await this.ventaRepository.find({
      relations: ['zapato'], 
      order: { id: 'ASC' },
    });

    return ventas.map(venta => ({
      id: venta.id,
      zapatoId: venta.zapato.id,  
      cantidad: venta.cantidad,
      total: venta.total,
    }));
  }

  async findOne(id: number) {
    const venta = await this.ventaRepository.findOne({
      where: { id },
      relations: ['zapato'],
    });
  
    if (!venta) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }
  
    return {
      id: venta.id,
      zapatoId: venta.zapato.id, 
      cantidad: venta.cantidad,
      total: venta.total,
    };
  }


  update(id: number, updateVentaDto: UpdateVentaDto) {
    return `This action updates a #${id} venta`;
  }


  remove(id: number) {
    return `This action removes a #${id} venta`;
  }

  async findAlld(filtros: FiltroVentasDto) {
    const queryBuilder = this.ventaRepository.createQueryBuilder('venta')
      .leftJoinAndSelect('venta.zapato', 'zapato');
  
    if (filtros.marca) {
      queryBuilder.andWhere('zapato.marca = :marca', { marca: filtros.marca });
    }
  
    if (filtros.género) {
      queryBuilder.andWhere('zapato.género = :genero', { genero: filtros.género });
    }
  
    if (filtros.categoría) {
      queryBuilder.andWhere('zapato.categoría = :categoria', { categoria: filtros.categoría });
    }
  
    const ventas = await queryBuilder.orderBy('venta.id', 'ASC').getMany();
  
    return ventas.map(venta => ({
      id: venta.id,
      zapatoId: venta.zapato.id,
      marca: venta.zapato.marca,
      categoria: venta.zapato.categoría,
      genero: venta.zapato.género,
      cantidad: venta.cantidad,
      total: venta.total,
    }));
  }
  



}
