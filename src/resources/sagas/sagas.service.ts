import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSagaDto } from './models/dto/create-saga.dto';
import { UpdateSagaDto } from './models/dto/update-saga.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Saga } from './models/saga.schema';
import { Model, ObjectId, Types } from 'mongoose';

@Injectable()
export class SagasService {

  constructor(
    @InjectModel(Saga.name) private readonly sagaModel: Model<Saga>
  ) {}

  // new SlugPipe('title')) slug: string
  async create(dto: CreateSagaDto) {

    const exists = await this.checkExistingSaga(dto.title);

    if (exists) {
      throw new BadRequestException('Saga ya existente.');
    } 

    const saga = await this.sagaModel.create(dto);
    return saga.toObject();
  }

  findAll() {
    return `This action returns all sagas`;
  }

  private async checkExistingSaga(title: string): Promise<boolean>{
    const exists = await this.sagaModel.findOne({title}).exec();

    return exists ? true : false;
  }

  update(id: number, updateSagasDto: UpdateSagaDto) {
    return `This action updates a #${id} sagas`;
  }

  remove(id: number) {
    return `This action removes a #${id} sagas`;
  }
}
