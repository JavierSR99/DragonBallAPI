import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { Character, CharacterSchema } from './models/character.schema';
import { Saga, SagaSchema } from '../sagas/models/saga.schema';
import { Planet, PlanetSchema } from '../planets/models/planet.schema';
import { Race, RaceSchema } from '../races/models/races.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
      { name: Saga.name, schema: SagaSchema },
      { name: Planet.name, schema: PlanetSchema },
      { name: Race.name, schema: RaceSchema }
    ])
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
