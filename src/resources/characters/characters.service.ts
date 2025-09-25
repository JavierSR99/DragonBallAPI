import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './models/dto/create-character.dto';
import { UpdateCharacterDto } from './models/dto/update-character.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Character, CharacterDocument } from './models/character.schema';
import { Model } from 'mongoose';
import { Planet } from '../planets/models/planet.schema';
import { Race } from '../races/models/races.schema';
import { Saga } from '../sagas/models/saga.schema';

@Injectable()
export class CharactersService {

  //#region CONSTRRUCTOR
  constructor(
    @InjectModel(Character.name) private readonly characterModel: Model<CharacterDocument>,
    @InjectModel(Planet.name) private readonly planetModel: Model<Planet>,
    @InjectModel(Race.name)   private readonly raceModel: Model<Race>,
    @InjectModel(Saga.name)   private readonly sagaModel: Model<Saga>
  ) {}
  //#endregion


  //#region CREATE METHODS
  async create(dto: CreateCharacterDto): Promise<Character> {

    // Comprobamos existencia de personaje en saga
    const exists = await this.checkExistingCharacter(dto);
    if (exists) throw new ConflictException('El personaje ya existe en la/s saga/s selecionada/s');
    
    // Comprobamos que las sagas del personaje existan
    const missingSagas = await this.checkExistingSagas(dto);
    if (missingSagas.length) throw new BadRequestException(`Sagas no existentes: ${missingSagas.join(', ')}`);


    // Comprobamos que las referencias del personaje son correctas
    const refsErrors = await this.checkCharacterRefs(dto);
    if (refsErrors.length) throw new BadRequestException(`Errores: ${refsErrors.join(', ')}`);

    

    const created = await this.characterModel.create(dto);
    let character = created.toObject();

    return character;
  }
  //#endregion

  //#region CHECK/GET METHODS
  private async checkExistingCharacter(dto: CreateCharacterDto): Promise<boolean> {
    const exists = await this.characterModel.exists({
      name: dto.name,
      sagas: { $in: dto.sagas }
    });

    return exists ? true : false;
  }

  private async checkExistingSagas(dto: CreateCharacterDto): Promise<string[]> {
    const uniqueSagaIds = [...new Set(dto.sagas)];
    const found = await this.sagaModel.find({ _id: { $in: uniqueSagaIds } })
      .select('_id').lean();

    const foundSet = new Set(found.map(s => s._id.toString()));
    const missing = uniqueSagaIds.filter(id => !foundSet.has(id));

    return missing;
  }

  private async checkCharacterRefs(dto: CreateCharacterDto): Promise<string[]> {
    const errors: string[] = [];

    // Race -> debe existir y traer su planet
    let raceDoc: { _id: any; planet?: any } | null = null;
    if (dto.race) {
      raceDoc = await this.raceModel.findById(dto.race).select('_id planet').lean();

      if(!raceDoc) {
        errors.push('Raza no existente');
      } else if (!raceDoc.planet) {
        errors.push('La raza seleccionadaa no tiene planeta asignado');
      }
    }

    // originPlanet -> si viene, debe existir
    if (dto.originPlanet) {
      const planetOk = await this.planetModel.exists({ _id: dto.originPlanet });
      if (!planetOk) errors.push('Planeta no encontrado');
    }

    // Consistencia: originPlanet del Character debe coincidir con race.planet
    if (raceDoc?.planet) {
      if (dto.originPlanet) {
        if (raceDoc.planet.toString() !== dto.originPlanet) {
          errors.push('Inconsistencia: el planeta de origen no coincide con el planetaa asociado a la raza');
        }
      } else {
        dto.originPlanet = raceDoc.planet.toString();
      }
    }

    return errors;
  }
  //#endregion


  // findAll() {
  //   return `This action returns all characters`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} character`;
  // }

  // update(id: number, updateCharacterDto: UpdateCharacterDto) {
  //   return `This action updates a #${id} character`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} character`;
  // }
}
