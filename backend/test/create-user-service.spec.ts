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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error if a user with the same name already exists', async () => {
    const userId = faker.string.uuid();
    const name = faker.person.fullName();

    mockUserRepository.injectData([{ userId, name }]);

    const createInput: UserCreateInput = { userId, name };

    // Expecting the service to throw an HttpException with BAD_REQUEST status
    await expect(service.handle(createInput)).rejects.toThrowError(
      new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: 'Já existe um usuário com este nome',
        },
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('should create a new customer if the name is unique', async () => {
    const userId = faker.string.uuid();
    const name = faker.person.fullName();

    const createInput: UserCreateInput = { userId, name };

    const result = await service.handle(createInput);
    expect(result).toEqual({ success: true });

    // Verifying that the create method was called with the correct data
    expect(mockUserRepository.create).toHaveBeenCalledWith(createInput);
  });
});
