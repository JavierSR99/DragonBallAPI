import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSagaDto } from './models/dto/create-saga.dto';
import { UpdateSagaDto } from './models/dto/update-saga.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Saga } from './models/saga.schema';
import { Model, ObjectId, Types } from 'mongoose';

@Injectable()
export class SagasService {

  //#region CONSTRUCTOR
  constructor(
    @InjectModel(Saga.name) private readonly sagaModel: Model<Saga>
  ) {}
  //#endregion

  //#region CREATION METHODS
  async create(dto: CreateSagaDto) {
    const exists = await this.checkExistingSaga(dto.title);

    if (exists) {
      throw new BadRequestException('Saga ya existente.');
    } 

    const saga = await this.sagaModel.create(dto);
    return saga.toObject();
  }
  //#endregion

  //#region CHECK/GETTERS METHODS
  private async checkExistingSaga(title: string): Promise<boolean>{
    const exists = await this.sagaModel.findOne({title}).exec();

    return exists ? true : false;
  }

  async findById(id: string) {
    const saga = await this.sagaModel.findById(id).lean().exec();

    if (!saga) throw new NotFoundException('Error: saga no encontrada.');
    
    return saga;
  }
  //#endregion

  //#region UPDATE METHODS
  update(id: number, updateSagasDto: UpdateSagaDto) {
    return `This action updates a #${id} sagas`;
  }
  //#endregion

  //#region REMOVE METHODS
  remove(id: number) {
    return `This action removes a #${id} sagas`;
  }
  //#endregion
}
