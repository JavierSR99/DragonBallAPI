import { Module } from '@nestjs/common';
import { TransformationsService } from './transformations.service';
import { TransformationsController } from './transformations.controller';

@Module({
  controllers: [TransformationsController],
  providers: [TransformationsService],
})
export class TransformationsModule {}
