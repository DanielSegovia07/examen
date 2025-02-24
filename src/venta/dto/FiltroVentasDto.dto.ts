import { IsOptional, IsString } from 'class-validator';

export class FiltroVentasDto {
  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsString()
  género?: string;

  @IsOptional()
  @IsString()
  categoría?: string;
}
