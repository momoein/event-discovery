import { Test, TestingModule } from '@nestjs/testing';
import { RsvpService } from './rsvp.service';

describe('RsvpService', () => {
  let service: RsvpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RsvpService],
    }).compile();

    service = module.get<RsvpService>(RsvpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
