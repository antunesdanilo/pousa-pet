import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker/.';
import { CreateBoardingService } from 'src/modules/boarding/services/create.service';
import { TestMockBoardingRepository } from 'src/repositories/test-mock-repositories/boarding.repository';
import { BoardingRepository } from 'src/repositories/abstract-repositories/boarding.repository';
import { BoardingCreateInput } from 'src/modules/boarding/inputs/boarding-create.input';
import { TestMockPetRepository } from 'src/repositories/test-mock-repositories/pet.repository';
import { TestMockUserRepository } from 'src/repositories/test-mock-repositories/user.repository';
import { PetRepository } from 'src/repositories/abstract-repositories/pet.repository';
import { UserRepository } from 'src/repositories/abstract-repositories/user.repository';
import { PetDto } from 'src/modules/pet/dtos/pet.dto';
import { UserDto } from 'src/modules/user/dtos/user.dto';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CreateBoardingService', () => {
  let service: CreateBoardingService;

  const mockBoardingRepository = new TestMockBoardingRepository();
  const mockPetRepository = new TestMockPetRepository();
  const mockUserRepository = new TestMockUserRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBoardingService,
        { provide: BoardingRepository, useValue: mockBoardingRepository },
        { provide: PetRepository, useValue: mockPetRepository },
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<CreateBoardingService>(CreateBoardingService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockBoardingRepository.injectData([]);
    mockPetRepository.injectData([]);
    mockUserRepository.injectData([]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully create a boarding if pet and user exist', async () => {
    const mockPet: PetDto = {
      petId: faker.string.uuid(),
      tutorId: faker.string.uuid(),
      speciesId: faker.string.uuid(),
      breedId: faker.string.uuid(),
      name: faker.person.firstName(),
    };
    const mockUser: UserDto = {
      userId: faker.string.uuid(),
      name: faker.person.fullName(),
    };

    mockPetRepository.injectData([mockPet]);
    mockUserRepository.injectData([mockUser]);

    const createInput: BoardingCreateInput = {
      petId: mockPet.petId,
      insertedByUserId: mockUser.userId,
      checkInDate: new Date(),
      expectedDailyStays: 5,
    };

    const result: CreateStatusDto = await service.handle(createInput);

    expect(result.success).toBe(true);
    expect(mockBoardingRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        petId: createInput.petId,
        insertedByUserId: createInput.insertedByUserId,
        checkInDate: createInput.checkInDate,
        expectedDailyStays: createInput.expectedDailyStays,
      }),
    );
  });

  it('should throw an error if pet is not found', async () => {
    const petId = faker.string.uuid();

    const mockUser: UserDto = {
      userId: faker.string.uuid(),
      name: faker.person.fullName(),
    };

    mockUserRepository.injectData([mockUser]);

    const createInput: BoardingCreateInput = {
      petId,
      insertedByUserId: mockUser.userId,
      checkInDate: new Date(),
      expectedDailyStays: 5,
    };

    try {
      await service.handle(createInput);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error_code).toBe('INVALID_DATA');
      expect(error.response.error_description).toBe(
        `O pet com o ID ${petId} não foi encontrado.`,
      );
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should throw an error if user is not found', async () => {
    const petId = faker.string.uuid();
    const userId = faker.string.uuid();

    const mockPet: PetDto = {
      petId,
      tutorId: faker.string.uuid(),
      speciesId: faker.string.uuid(),
      breedId: faker.string.uuid(),
      name: faker.person.firstName(),
    };

    mockPetRepository.injectData([mockPet]);

    const createInput: BoardingCreateInput = {
      petId,
      insertedByUserId: userId,
      checkInDate: new Date(),
      expectedDailyStays: 5,
    };

    try {
      await service.handle(createInput);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error_code).toBe('INVALID_DATA');
      expect(error.response.error_description).toBe(
        `O usuário com o ID ${userId} não foi encontrado.`,
      );
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });
});
