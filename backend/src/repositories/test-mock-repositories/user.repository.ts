import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/modules/user/dtos/user.dto';
import { UserRepository } from '../abstract-repositories/user.repository';
import { UserCreateData } from '../create-data/user-create.data';
import { TestMockRepository } from '../abstract-repositories/test.repository';

@Injectable()
export class TestMockUserRepository
  implements UserRepository, TestMockRepository<UserDto>
{
  private users: UserDto[] = [];

  injectData(data: UserDto[]): void {
    this.users = data;
  }

  findMany = jest.fn().mockImplementation((): Promise<UserDto[]> => {
    return Promise.resolve(this.users);
  });

  findById = jest
    .fn()
    .mockImplementation((userId: string): Promise<UserDto | undefined> => {
      const user = this.users.find((u) => u.userId === userId);
      return Promise.resolve(user);
    });

  findByName = jest
    .fn()
    .mockImplementation((name: string): Promise<UserDto | undefined> => {
      const user = this.users.find((u) => u.name === name);
      return Promise.resolve(user);
    });

  create = jest
    .fn()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .mockImplementation((_data: UserCreateData): Promise<void> => {
      return Promise.resolve();
    });
}
