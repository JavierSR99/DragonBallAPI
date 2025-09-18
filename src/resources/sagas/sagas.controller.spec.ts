import { Test, TestingModule } from '@nestjs/testing';
import { SagasController } from './sagas.controller';
import { SagasService } from './sagas.service';

describe('SagasController', () => {
  let controller: SagasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SagasController],
      providers: [SagasService],
    }).compile();

    controller = module.get<SagasController>(SagasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
