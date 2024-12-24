import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { faker } from '@faker-js/faker/.';
import { CreateSpeciesService } from 'src/modules/species/service/create.service';
import { TestMockSpeciesRepository } from 'src/repositories/test-mock-repositories/species.repository';
import { SpeciesRepository } from 'src/repositories/abstract-repositories/species.repository';
import { SpeciesCreateInput } from 'src/modules/species/inputs/species-create.input';

describe('CreateSpeciesService', () => {
  let service: CreateSpeciesService;

  const mockSpeciesRepository = new TestMockSpeciesRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSpeciesService,
        { provide: SpeciesRepository, useValue: mockSpeciesRepository },
      ],
    }).compile();

    service = module.get<CreateSpeciesService>(CreateSpeciesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockSpeciesRepository.injectData([]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error if a species with the same name already exists', async () => {
    const speciesId = faker.string.uuid();
    const name = faker.person.fullName();

    mockSpeciesRepository.injectData([{ speciesId, name }]);

    const createInput: SpeciesCreateInput = { name };

    try {
      await service.handle(createInput);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error_code).toBe('INVALID_DATA');
      expect(error.response.error_description).toBe(
        'Já existe uma espécie com este nome',
      );
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should create a new species if the name is unique', async () => {
    const name = faker.person.fullName();

    const createInput: SpeciesCreateInput = { name };

    const result = await service.handle(createInput);
    expect(result).toEqual({ success: true });

    expect(mockSpeciesRepository.findByName).toHaveBeenCalledWith(name);

    expect(mockSpeciesRepository.create).toHaveBeenCalledWith({
      speciesId: expect.any(String),
      name,
    });
  });
});
