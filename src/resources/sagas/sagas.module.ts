import { Module } from '@nestjs/common';
import { SagasService } from './sagas.service';
import { SagasController } from './sagas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Saga, SagaSchema } from './models/saga.schema';
import { SagasRepository } from './sagas.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Saga.name, schema: SagaSchema }
    ])
  ],
  controllers: [SagasController],
  providers: [SagasService, SagasRepository],
  exports: [SagasRepository]
})
export class SagasModule {}
