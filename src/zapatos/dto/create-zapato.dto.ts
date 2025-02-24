import { IsBoolean, IsIn, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateZapatoDto {

    @IsString()
    nombre : string;

    @IsString()
    marca : string

    @IsNumber()
    @IsPositive()
    talla :  number

    @IsNumber()
    @IsPositive()
    precio : number

    @IsNumber()
    @IsPositive()
    @IsOptional()
    stock : number

    @IsIn(['Hombre','Mujer','Unisex'])
    género : string;

    @IsString()
    categoría : string

    @IsBoolean()
    activo : boolean

}
