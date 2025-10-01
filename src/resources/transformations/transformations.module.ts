import { Module } from '@nestjs/common';
import { TransformationsService } from './transformations.service';
import { TransformationsController } from './transformations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transformation, TransformationSchema } from './models/transformation.schema';
import { Character, CharacterSchema } from '../characters/models/character.schema';
import { SharedModule } from 'src/shared/shared.module';
import { Saga, SagaSchema } from '../sagas/models/saga.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transformation.name, schema: TransformationSchema },
      { name: Character.name, schema: CharacterSchema },
      { name: Saga.name, schema: SagaSchema }
    ]),
    SharedModule
  ],
  controllers: [TransformationsController],
  providers: [TransformationsService],
})
export class TransformationsModule {}
