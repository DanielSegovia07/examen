import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateZapatoDto } from './dto/create-zapato.dto';
import { UpdateZapatoDto } from './dto/update-zapato.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Zapato } from './entities/zapato.entity';
import { Repository } from 'typeorm';
import { RestockZapatoDto } from './dto/restock-zapato.dto';

@Injectable()
export class ZapatosService {
  private readonly logger = new Logger('ZapatosService')
  constructor(
    @InjectRepository(Zapato)
    private readonly zapatoRepository: Repository<Zapato>
  ){}

  async create(createZapatoDto: CreateZapatoDto) {

    if (createZapatoDto.stock !== undefined) {
      throw new BadRequestException('No se puede incluir el stock al crear un zapato');
    }

    try {

      const {stock,activo, ...zapato} = createZapatoDto

      const zapatos = this.zapatoRepository.create(zapato)

      await this.zapatoRepository.save(zapatos)

      return zapatos
      
    } catch (error) {
     this.handleExceptions(error)
    }
  }

  findAll() {
    return this.zapatoRepository.find({ where: { activo: true }, order:{id:'ASC'}})
  }

  async findOne(id: number) {
    const zapato =  await this.zapatoRepository.findOne({where:{id, activo : true}})

    if (!zapato) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return zapato
  }

  async update(id: number, updateZapatoDto: UpdateZapatoDto) {
    if (updateZapatoDto.stock !== undefined) {
      throw new BadRequestException('No se puede modificar el stock al actualizar un zapato');
    }
  
    try {
      const zapato = await this.zapatoRepository.findOne({where:{id, activo : true}})
  
      if (!zapato) {
        throw new NotFoundException(`Zapato con ID ${id} no encontrado`);
      }

      Object.assign(zapato, updateZapatoDto);
      
      await this.zapatoRepository.save(zapato);
  
      return zapato;
  
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: number) {
    const zapato = await this.zapatoRepository.findOne({ where: { id } }); 
    if (!zapato) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    zapato.activo = false;

    await this.zapatoRepository.save(zapato); 

    return zapato; 
  }
  
  async restock(restockZapatoDto: RestockZapatoDto) {
    const { id, cantidad } = restockZapatoDto;

    
    const zapato = await this.zapatoRepository.findOne({ where: { id } });

    
    if (!zapato) {
      throw new NotFoundException(`Zapato con ID ${id} no encontrado`);
    }

  
    zapato.stock = (zapato.stock || 0) + cantidad;

  
    await this.zapatoRepository.save(zapato);

    return zapato;  

  }

  private handleExceptions(error) : any{
    if(error.code == '23505'){
      throw new BadRequestException(error.detail);
      }
      this.logger.error(error)
      throw new InternalServerErrorException('Unexpected error, check server logs')
  }

 
}
