import { Injectable } from '@nestjs/common';
import { CreateTransformationDto } from './dto/create-transformation.dto';
import { UpdateTransformationDto } from './dto/update-transformation.dto';

@Injectable()
export class TransformationsService {
  create(createTransformationDto: CreateTransformationDto) {
    return 'This action adds a new transformation';
  }

  findAll() {
    return `This action returns all transformations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transformation`;
  }

  update(id: number, updateTransformationDto: UpdateTransformationDto) {
    return `This action updates a #${id} transformation`;
  }

  remove(id: number) {
    return `This action removes a #${id} transformation`;
  }
}
