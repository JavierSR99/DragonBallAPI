import { Test, TestingModule } from '@nestjs/testing';
import { TransformationsService } from './transformations.service';

describe('TransformationsService', () => {
  let service: TransformationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformationsService],
    }).compile();

    service = module.get<TransformationsService>(TransformationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
