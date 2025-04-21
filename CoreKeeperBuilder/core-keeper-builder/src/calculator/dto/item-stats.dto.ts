import { IsNumber, IsOptional } from 'class-validator';

export class ItemStatsDto {
  @IsOptional() @IsNumber() health?: number;
  @IsOptional() @IsNumber() armor?: number;
  @IsOptional() @IsNumber() meleeDamage?: number;
  @IsOptional() @IsNumber() rangeDamage?: number;
  @IsOptional() @IsNumber() miningDamage?: number;
  @IsOptional() @IsNumber() movementSpeed?: number;
  @IsOptional() @IsNumber() critChance?: number;
  @IsOptional() @IsNumber() attackSpeed?: number;
}