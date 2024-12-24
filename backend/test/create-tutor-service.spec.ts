import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { faker } from '@faker-js/faker/.';
import { CreateTutorService } from 'src/modules/tutor/service/create.service';
import { TutorRepository } from 'src/repositories/abstract-repositories/tutor.repository';
import { TestMockTutorRepository } from 'src/repositories/test-mock-repositories/tutor.repository';
import { TutorCreateInput } from 'src/modules/tutor/inputs/tutor-create.input';

describe('CreateTutorService', () => {
  let service: CreateTutorService;

  const mockTutorRepository = new TestMockTutorRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTutorService,
        { provide: TutorRepository, useValue: mockTutorRepository },
      ],
    }).compile();

    service = module.get<CreateTutorService>(CreateTutorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockTutorRepository.injectData([]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error if a tutor with the same name already exists', async () => {
    const tutorId = faker.string.uuid();
    const name = faker.person.fullName();
    const phoneNumber = faker.phone.number();

    mockTutorRepository.injectData([{ tutorId, name, phoneNumber }]);

    const createInput: TutorCreateInput = { name, phoneNumber };

    try {
      await service.handle(createInput);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error_code).toBe('INVALID_DATA');
      expect(error.response.error_description).toBe(
        'Já existe um tutor com este nome',
      );
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should create a new tutor if the name is unique', async () => {
    const name = faker.person.fullName();
    const phoneNumber = faker.phone.number();

    const createInput: TutorCreateInput = { name, phoneNumber };

    const result = await service.handle(createInput);
    expect(result).toEqual({ success: true });

    expect(mockTutorRepository.findByName).toHaveBeenCalledWith(name);

    expect(mockTutorRepository.create).toHaveBeenCalledWith({
      tutorId: expect.any(String),
      name,
      phoneNumber,
    });
  });
});
