import { BaseApiProvider } from './base-api.provider';
import { UserDto } from './dtos/user.dto';
import { UserCreateInput } from './inputs/user-create.input';
import { IUserProvider } from './interfaces/user.provider';

export class UserProvider extends BaseApiProvider implements IUserProvider {
  getUsers(): Promise<UserDto[]> {
    return this.get<UserDto[]>('/user');
  }

  createUser(createInput: UserCreateInput): Promise<void> {
    return this.post<void, UserCreateInput>('/user', createInput);
  }
}
