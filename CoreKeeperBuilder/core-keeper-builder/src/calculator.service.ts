
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CalculateStatsDto } from './calculator/dto/calculate-stats.dto';
import { ItemStatsDto } from './calculator/dto/item-stats.dto';
import { TotalStatsDto } from './calculator/dto/total-stats.dto';
import { DatabaseService } from './database.service';

@Injectable()
export class CalculatorService {
  private readonly logger = new Logger(CalculatorService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  calculateTotalStats(calculateStatsDto: CalculateStatsDto): TotalStatsDto {
    const totalStats: TotalStatsDto = {
      health: 0, armor: 0, meleeDamage: 0, rangeDamage: 0,
      miningDamage: 0, movementSpeed: 0, critChance: 0, attackSpeed: 0,
    };

    const addStats = (itemStats?: ItemStatsDto) => {
      if (!itemStats) return;
      totalStats.health += itemStats.health ?? 0;
      totalStats.armor += itemStats.armor ?? 0;
      totalStats.meleeDamage += itemStats.meleeDamage ?? 0;
      totalStats.rangeDamage += itemStats.rangeDamage ?? 0;
      totalStats.miningDamage += itemStats.miningDamage ?? 0;
      totalStats.movementSpeed += itemStats.movementSpeed ?? 0;
      totalStats.critChance += itemStats.critChance ?? 0;
      totalStats.attackSpeed += itemStats.attackSpeed ?? 0;
    };

    if (calculateStatsDto.weaponId) {
      const weapon = this.databaseService.findWeaponById(calculateStatsDto.weaponId);
      if (!weapon) this.logger.warn(`Weapon ID "${calculateStatsDto.weaponId}" not found.`);
      else addStats(weapon.stats);

    }

    calculateStatsDto.armorIds?.forEach(id => {
      const armorPiece = this.databaseService.findArmorById(id);
      if (!armorPiece) this.logger.warn(`Armor ID "${id}" not found.`);
      else addStats(armorPiece.stats);
    });

    calculateStatsDto.accessoryIds?.forEach(id => {
      const accessory = this.databaseService.findAccessoryById(id);
      if (!accessory) this.logger.warn(`Accessory ID "${id}" not found.`);
      else addStats(accessory.stats);
    });

    return totalStats;
  }
}