import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Planet, PlanetSchema } from './models/planet.schema';
import { Saga, SagaSchema } from '../sagas/models/saga.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Planet.name, schema: PlanetSchema },
      { name: Saga.name,   schema: SagaSchema }
    ])
  ],
  controllers: [PlanetsController],
  providers: [PlanetsService],
})
export class PlanetsModule {}
