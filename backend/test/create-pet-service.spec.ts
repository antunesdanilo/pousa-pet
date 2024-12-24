import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker/.';
import { CreatePetService } from 'src/modules/pet/services/create.service';
import { TestMockPetRepository } from 'src/repositories/test-mock-repositories/pet.repository';
import { PetCreateInput } from 'src/modules/pet/inputs/pet-create.input';
import { TestMockTutorRepository } from 'src/repositories/test-mock-repositories/tutor.repository';
import { TestMockSpeciesRepository } from 'src/repositories/test-mock-repositories/species.repository';
import { TestMockBreedRepository } from 'src/repositories/test-mock-repositories/breed.repository';
import { SpeciesRepository } from 'src/repositories/abstract-repositories/species.repository';
import { TutorRepository } from 'src/repositories/abstract-repositories/tutor.repository';
import { BreedRepository } from 'src/repositories/abstract-repositories/breed.repository';
import { TutorDto } from 'src/modules/tutor/dtos/tutor.dto';
import { SpeciesDto } from 'src/modules/species/dtos/species.dto';
import { BreedDto } from 'src/modules/breed/dtos/breed.dto';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import { PetRepository } from 'src/repositories/abstract-repositories/pet.repository';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CreatePetService', () => {
  let service: CreatePetService;

  const mockPetRepository = new TestMockPetRepository();
  const mockTutorRepository = new TestMockTutorRepository();
  const mockSpeciesRepository = new TestMockSpeciesRepository();
  const mockBreedRepository = new TestMockBreedRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePetService,
        { provide: PetRepository, useValue: mockPetRepository },
        { provide: TutorRepository, useValue: mockTutorRepository },
        { provide: SpeciesRepository, useValue: mockSpeciesRepository },
        { provide: BreedRepository, useValue: mockBreedRepository },
      ],
    }).compile();

    service = module.get<CreatePetService>(CreatePetService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockPetRepository.injectData([]);
    mockTutorRepository.injectData([]);
    mockSpeciesRepository.injectData([]);
    mockBreedRepository.injectData([]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully create a pet if all entities are valid', async () => {
    const name = faker.person.firstName();
    const speciesId = faker.string.uuid();
    const mockTutor: TutorDto = {
      tutorId: faker.string.uuid(),
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
    };
    const mockSpecies: SpeciesDto = {
      speciesId,
      name: faker.person.firstName(),
    };
    const mockBreed: BreedDto = {
      breedId: faker.string.uuid(),
      speciesId,
      name: faker.person.firstName(),
    };

    const createInput: PetCreateInput = {
      name,
      tutorId: mockTutor.tutorId,
      speciesId: mockSpecies.speciesId,
      breedId: mockBreed.breedId,
    };

    mockTutorRepository.injectData([mockTutor]);
    mockSpeciesRepository.injectData([mockSpecies]);
    mockBreedRepository.injectData([mockBreed]);

    const result: CreateStatusDto = await service.handle(createInput);

    expect(result.success).toBe(true);
    expect(mockPetRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        tutorId: createInput.tutorId,
        speciesId: createInput.speciesId,
        breedId: createInput.breedId,
        name: createInput.name,
      }),
    );
  });

  it('should throw an error if a pet with the same name already exists', async () => {
    const name = faker.person.firstName();
    const mockTutor: TutorDto = {
      tutorId: faker.string.uuid(),
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
    };
    const mockSpecies: SpeciesDto = {
      speciesId: faker.string.uuid(),
      name: faker.person.firstName(),
    };
    const mockBreed: BreedDto = {
      breedId: faker.string.uuid(),
      speciesId: mockSpecies.speciesId,
      name: faker.person.firstName(),
    };

    mockTutorRepository.injectData([mockTutor]);
    mockSpeciesRepository.injectData([mockSpecies]);
    mockBreedRepository.injectData([mockBreed]);

    mockPetRepository.injectData([
      {
        petId: faker.string.uuid(),
        name,
        tutorId: mockTutor.tutorId,
        speciesId: mockSpecies.speciesId,
        breedId: mockBreed.breedId,
      },
    ]);

    const createInput: PetCreateInput = {
      name,
      tutorId: mockTutor.tutorId,
      speciesId: mockSpecies.speciesId,
      breedId: mockBreed.breedId,
    };

    try {
      await service.handle(createInput);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error_code).toBe('INVALID_DATA');
      expect(error.response.error_description).toBe(
        'Já existe um pet cadastrado com este nome.',
      );
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should throw an error if the tutor is not found', async () => {
    const name = faker.person.firstName();
    const mockSpecies: SpeciesDto = {
      speciesId: faker.string.uuid(),
      name: faker.person.firstName(),
    };
    const mockBreed: BreedDto = {
      breedId: faker.string.uuid(),
      speciesId: mockSpecies.speciesId,
      name: faker.person.firstName(),
    };

    mockSpeciesRepository.injectData([mockSpecies]);
    mockBreedRepository.injectData([mockBreed]);

    const createInput: PetCreateInput = {
      name,
      tutorId: faker.string.uuid(),
      speciesId: mockSpecies.speciesId,
      breedId: mockBreed.breedId,
    };

    try {
      await service.handle(createInput);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error_code).toBe('INVALID_DATA');
      expect(error.response.error_description).toBe(
        `O tutor com o ID ${createInput.tutorId} não foi encontrado.`,
      );
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should throw an error if the species is not found', async () => {
    const name = faker.person.firstName();
    const mockTutor: TutorDto = {
      tutorId: faker.string.uuid(),
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
    };

    mockTutorRepository.injectData([mockTutor]);

    const createInput: PetCreateInput = {
      name,
      tutorId: mockTutor.tutorId,
      speciesId: faker.string.uuid(),
      breedId: faker.string.uuid(),
    };

    try {
      await service.handle(createInput);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error_code).toBe('INVALID_DATA');
      expect(error.response.error_description).toBe(
        `A espécie com o ID ${createInput.speciesId} não foi encontrada.`,
      );
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should throw an error if the breed is not found or does not match species', async () => {
    const name = faker.person.firstName();
    const mockTutor: TutorDto = {
      tutorId: faker.string.uuid(),
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
    };
    const mockSpecies: SpeciesDto = {
      speciesId: faker.string.uuid(),
      name: faker.person.firstName(),
    };

    mockTutorRepository.injectData([mockTutor]);
    mockSpeciesRepository.injectData([mockSpecies]);

    const createInput: PetCreateInput = {
      name,
      tutorId: mockTutor.tutorId,
      speciesId: mockSpecies.speciesId,
      breedId: faker.string.uuid(),
    };

    try {
      await service.handle(createInput);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error_code).toBe('INVALID_DATA');
      expect(error.response.error_description).toBe(
        `A raça com o ID ${createInput.breedId} não foi encontrada ou não pertence à espécie informada.`,
      );
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });
});
