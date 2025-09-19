import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Race, RaceDocument } from './models/races.schema';
import { Model } from 'mongoose';
import { CreateRaceDto } from './models/dto/create-race.dto';

@Injectable()
export class RacesService {

    //#region CONSTRUCTOR
    constructor(
        @InjectModel(Race.name) private readonly raceModel: Model<RaceDocument>
    ) {}
    //#endregion

    //#region CREATE METHODS
    async create(dto: CreateRaceDto): Promise<Race> {
        const exists = await this.checkExistingRace(dto.name);

        if (exists) throw new ConflictException('Raza ya existente.');

        const created = await this.raceModel.create(dto);

        return await created.toObject();
    }
    //#endregion

    //#region CHECK/GET METHODS
    private async checkExistingRace(name: string): Promise<boolean> {
        const exists = await this.raceModel.findOne({name}).exec();

        return exists ? true : false;
    }
    //#endregion

}
