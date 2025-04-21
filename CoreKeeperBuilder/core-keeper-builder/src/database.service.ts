
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { ItemStatsDto } from './calculator/dto/item-stats.dto';

interface BaseItem { id: string; name: string; stats: ItemStatsDto; }
interface ArmorItem extends BaseItem { slot: string; }
interface AccessoryItem extends BaseItem { slot: string; }
type WeaponItem = BaseItem;

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  private weapons: WeaponItem[] = [];
  private armor: ArmorItem[] = [];
  private accessories: AccessoryItem[] = [];

  private dataPath = path.join(process.cwd(), 'dist', 'database', 'data');

  async onModuleInit() {
    this.logger.log('Initializing DatabaseService: Loading item data...');
    await this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      const weaponData = await fs.readFile(path.join(this.dataPath, 'weapons.json'), 'utf-8');
      this.weapons = JSON.parse(weaponData);
      this.logger.log(`Loaded ${this.weapons.length} weapons.`);

      const armorData = await fs.readFile(path.join(this.dataPath, 'armor.json'), 'utf-8');
      this.armor = JSON.parse(armorData);
      this.logger.log(`Loaded ${this.armor.length} armor pieces.`);

      const accessoryData = await fs.readFile(path.join(this.dataPath, 'accessories.json'), 'utf-8');
      this.accessories = JSON.parse(accessoryData);
      this.logger.log(`Loaded ${this.accessories.length} accessories.`);

    } catch (error) {
      this.logger.error('Failed to load item data from JSON files!', error.stack);
    }
  }

  findWeaponById(id: string): WeaponItem | undefined {
    return this.weapons.find(item => item.id === id);
  }

  findArmorById(id: string): ArmorItem | undefined {
    return this.armor.find(item => item.id === id);
  }

  findAccessoryById(id: string): AccessoryItem | undefined {
    return this.accessories.find(item => item.id === id);
  }
}