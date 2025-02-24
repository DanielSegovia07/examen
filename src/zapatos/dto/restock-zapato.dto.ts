import { IsNumber, IsPositive } from 'class-validator';

export class RestockZapatoDto {
  
  @IsNumber()
  @IsPositive()
  id: number;  

  @IsNumber()
  @IsPositive()
  cantidad: number;  
}
