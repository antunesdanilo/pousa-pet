import { Test, TestingModule } from '@nestjs/testing';

import { UserRepository } from 'src/repositories/abstract-repositories/user.repository';

import { HttpException, HttpStatus } from '@nestjs/common';
import { UserCreateService } from 'src/modules/user/service/create.service';
import { TestMockUserRepository } from 'src/repositories/test-mock-repositories/user.repository';
import { UserCreateInput } from 'src/modules/user/inputs/user-create.input';
import { faker } from '@faker-js/faker/.';

describe('UserCreateService', () => {
  let service: UserCreateService;

  const mockUserRepository = new TestMockUserRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCreateService,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UserCreateService>(UserCreateService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockUserRepository.injectData([]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error if a user with the same name already exists', async () => {
    const userId = faker.string.uuid();
    const name = faker.person.fullName();

    mockUserRepository.injectData([{ userId, name }]);

    const createInput: UserCreateInput = { name };

    try {
      await service.handle(createInput);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.error_code).toBe('INVALID_DATA');
      expect(error.response.error_description).toBe(
        'Já existe um usúario com este nome',
      );
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should create a new user if the name is unique', async () => {
    const name = faker.person.fullName();

    const createInput: UserCreateInput = { name };

    const result = await service.handle(createInput);
    expect(result).toEqual({ success: true });

    expect(mockUserRepository.findByName).toHaveBeenCalledWith(name);

    expect(mockUserRepository.create).toHaveBeenCalledWith({
      userId: expect.any(String),
      name,
    });
  });
});
