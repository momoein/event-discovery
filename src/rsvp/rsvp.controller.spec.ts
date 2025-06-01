import { Test, TestingModule } from '@nestjs/testing';
import { RsvpController } from './rsvp.controller';

describe('RsvpController', () => {
  let controller: RsvpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RsvpController],
    }).compile();

    controller = module.get<RsvpController>(RsvpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
