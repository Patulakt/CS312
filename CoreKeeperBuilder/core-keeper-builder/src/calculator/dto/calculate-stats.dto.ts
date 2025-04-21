import { IsArray, IsOptional, IsString } from 'class-validator';

export class CalculateStatsDto {
  @IsOptional()
  @IsString()
  weaponId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  armorIds?: string[]; 

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  accessoryIds?: string[];
}