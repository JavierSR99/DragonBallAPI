import { Test, TestingModule } from '@nestjs/testing';
import { RefCheckService } from './ref-check.service';

describe('RefCheckService', () => {
  let service: RefCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefCheckService],
    }).compile();

    service = module.get<RefCheckService>(RefCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
