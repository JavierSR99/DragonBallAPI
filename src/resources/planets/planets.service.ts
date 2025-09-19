import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanetDto } from './models/dto/create-planet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Planet, PlanetDocument } from './models/planet.schema';
import { Model, Types } from 'mongoose';
import { Saga, SagaDocument } from '../sagas/models/saga.schema';
import { persistImageBuffer } from 'src/common/utils/image-save.util';

@Injectable()
export class PlanetsService {

  //#region CONSTRUCTOR
  constructor(
    @InjectModel(Planet.name) private readonly planetModel: Model<PlanetDocument>,
    @InjectModel(Saga.name) private readonly sagaModel: Model<SagaDocument>
  ) {}
  //#endregion

  //#region CREATE METHODS
  async create(dto: CreatePlanetDto, file?: Express.Multer.File): Promise<Planet> {

    const exists = await this.checkExistingPlanet(dto.name);

    if (exists) throw new ConflictException('Planeta ya existente.')

    if (dto.whenDestroyed?.length) {

      // Validamos que las sagas introducidas en whenDestroyed existan
      const ids = dto.whenDestroyed.map(id => new Types.ObjectId(id));
      const count = await this.sagaModel.countDocuments({ _id: { $in: ids } });

      if (count !== ids.length) {
        throw new NotFoundException('Una o más sagas introducidas no existen');
      }

      // Reasignar como ObjectId[] para guardar tipado
      (dto as any).whenDestroyed = ids;
    }

    const created = await this.planetModel.create(dto);
    let planet = created.toObject();

    if (file) {
      const imagePath = persistImageBuffer('planets', file);
      await this.planetModel.updateOne({_id: planet._id}, { $set: { image: imagePath } }).exec();
      planet.image = imagePath;
    }

    return planet;
  }
  //#endregion

  //#region CHECK/GET METHODS
  private async checkExistingPlanet(name: string): Promise<boolean> {
    const exists = await this.planetModel.findOne({name}).exec();

    return exists ? true : false;
  }

  async findById(id: string) {
    const planet = await this.planetModel
      .findById(id)
      .populate({path: 'whenDestroyed', select: 'title arcType summary -_id'})
      .lean()
      .exec();

    if (!planet) throw new NotFoundException('Planeta no encontrado');

    return planet;
  }
  //#endregion
  // findAll() {
  //   return `This action returns all planets`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} planet`;
  // }

  // update(id: number, updatePlanetDto: UpdatePlanetDto) {
  //   return `This action updates a #${id} planet`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} planet`;
  // }
}
