import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { faker } from '@faker-js/faker/.';
import { CreateBreedService } from 'src/modules/breed/service/create.service';
import { BreedRepository } from 'src/repositories/abstract-repositories/breed.repository';
import { TestMockBreedRepository } from 'src/repositories/test-mock-repositories/breed.repository';
import { BreedCreateInput } from 'src/modules/breed/inputs/breed-create.input';
import { BreedDto } from 'src/modules/breed/dtos/breed.dto';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import { TestMockSpeciesRepository } from 'src/repositories/test-mock-repositories/species.repository';
import { SpeciesRepository } from 'src/repositories/abstract-repositories/species.repository';
import { SpeciesDto } from 'src/modules/species/dtos/species.dto';

describe('CreateBreedService', () => {
  let service: CreateBreedService;

  const mockBreedRepository = new TestMockBreedRepository();
  const mockSpeciesRepository = new TestMockSpeciesRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBreedService,
        { provide: BreedRepository, useValue: mockBreedRepository },
        { provide: SpeciesRepository, useValue: mockSpeciesRepository },
      ],
    }).compile();

    service = module.get<CreateBreedService>(CreateBreedService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockBreedRepository.injectData([]);
    mockSpeciesRepository.injectData([]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error if a breed with the same name and speciesId already exists', async () => {
    const mockSpecies: SpeciesDto = {
      speciesId: faker.string.uuid(),
      name: faker.person.firstName(),
    };

    const mockBreed: BreedDto = {
      breedId: faker.string.uuid(),
      speciesId: mockSpecies.speciesId,
      name: faker.person.fullName(),
    };

    mockSpeciesRepository.injectData([mockSpecies]);
    mockBreedRepository.injectData([mockBreed]);

    const createInput: BreedCreateInput = {
      speciesId: mockBreed.speciesId,
      name: mockBreed.name,
    };

    try {
      await service.handle(createInput);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error_code).toBe('INVALID_DATA');
      expect(error.response.error_description).toBe(
        'Já existe uma raça com este nome',
      );
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should not throw an error if a breed with the same name but a different speciesId exists', async () => {
    const name = faker.person.firstName();

    const mockSpecies: SpeciesDto = {
      speciesId: faker.string.uuid(),
      name: faker.person.firstName(),
    };

    const mockBreed: BreedDto = {
      breedId: faker.string.uuid(),
      speciesId: faker.string.uuid(),
      name,
    };

    mockSpeciesRepository.injectData([mockSpecies]);
    mockBreedRepository.injectData([mockBreed]);

    const createInput: BreedCreateInput = {
      speciesId: mockSpecies.speciesId,
      name: name,
    };

    const result: CreateStatusDto = await service.handle(createInput);

    expect(result.success).toBe(true);
    expect(mockBreedRepository.findByName).toHaveBeenCalledWith(
      createInput.name,
    );
    expect(mockBreedRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        speciesId: createInput.speciesId,
        name: createInput.name,
      }),
    );
  });

  it('should create a new breed if the name is unique', async () => {
    const name = faker.person.fullName();

    const mockSpecies: SpeciesDto = {
      speciesId: faker.string.uuid(),
      name: faker.person.firstName(),
    };

    const createInput: BreedCreateInput = {
      speciesId: mockSpecies.speciesId,
      name,
    };

    mockSpeciesRepository.injectData([mockSpecies]);

    const result = await service.handle(createInput);
    expect(result).toEqual({ success: true });

    expect(mockBreedRepository.findByName).toHaveBeenCalledWith(name);

    expect(mockBreedRepository.create).toHaveBeenCalledWith({
      breedId: expect.any(String),
      speciesId: mockSpecies.speciesId,
      name,
    });
  });

  it('should throw an error if the speciesId is not found', async () => {
    const createInput: BreedCreateInput = {
      speciesId: faker.string.uuid(),
      name: faker.person.firstName(),
    };

    try {
      await service.handle(createInput);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error_code).toBe('INVALID_DATA');
      expect(error.response.error_description).toBe(
        `A espécie de ID ${createInput.speciesId} não foi encontrada`,
      );
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }

    expect(mockBreedRepository.create).not.toHaveBeenCalled();
  });
});
