import { IsInt, IsNumber, IsPositive } from "class-validator"

export class CreateVentaDto {
    
    @IsInt()
    zapatoId: number; 
  
    @IsInt()
    @IsPositive()
    cantidad: number; 
}
