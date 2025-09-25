import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateTransformationDto } from './models/dto/create-transformation.dto';
import { UpdateTransformationDto } from './models/dto/update-transformation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transformation } from './models/transformation.schema';
import { Model } from 'mongoose';
import { Character } from '../characters/models/character.schema';
import { Saga } from '../sagas/models/saga.schema';
import { SagasRepository } from '../sagas/sagas.repository';

@Injectable()
export class TransformationsService {

  //#region CONSTRUCTOR
  constructor(
    @InjectModel(Transformation.name) private readonly transformationModel: Model<Transformation>,
    @InjectModel(Character.name) private readonly characterModel: Model<Character>,
    private readonly sagasRepository: SagasRepository
  ) {}
  //#endregion

  //#region CREATE METHODS
  async create(dto: CreateTransformationDto) {

    const [characterExists, missingSagas, existing] = await Promise.all([
      this.checkExistingCharacter(dto.character),
      this.sagasRepository.checkMissingSagaIds(dto.sagas),
      this.transformationModel.exists({name: dto.name})
    ]);

    if (existing) throw new ConflictException('Transformación ya existente');
    if (!characterExists) throw new BadRequestException('El personaje asociado a la transformación no existe');
    if (missingSagas.length) throw new BadRequestException(`Sagas no existentes: ${missingSagas.join(', ')}`);

    const created = await this.transformationModel.create(dto);
    let transformation = created.toObject();

    return transformation;
  }
  //#endregion

  //#region GET/CHECK METHODS
  private async checkExistingCharacter(id: string): Promise<Character | null> {
    const character = await this.characterModel.findById(id);
    return character;
  }

  //#endregion

  // findAll() {
  //   return `This action returns all transformations`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} transformation`;
  // }

  // update(id: number, updateTransformationDto: UpdateTransformationDto) {
  //   return `This action updates a #${id} transformation`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} transformation`;
  // }
}
