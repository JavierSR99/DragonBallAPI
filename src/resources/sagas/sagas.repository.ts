import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Saga } from './models/saga.schema';

@Injectable()
export class SagasRepository {
  constructor(
    @InjectModel(Saga.name) private readonly sagaModel: Model<Saga>,
  ) {}

  /**
   * Comprueba que todas las sagas existen en BD.
   * Devuelve un array con los IDs que no se han encontrado.
   */
  async checkMissingSagaIds(ids: string[]): Promise<string[]> {
    const uniqueIds = [...new Set(ids)].filter((id) =>
      Types.ObjectId.isValid(id),
    );

    if (!uniqueIds.length) return [];

    const found = await this.sagaModel
      .find({ _id: { $in: uniqueIds } })
      .select('_id')
      .lean();

    const foundSet = new Set(found.map((s) => s._id.toString()));
    return uniqueIds.filter((id) => !foundSet.has(id));
  }
}