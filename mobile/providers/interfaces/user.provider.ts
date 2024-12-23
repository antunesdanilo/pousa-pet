import { UserDto } from '../dtos/user.dto';
import { UserCreateInput } from '../inputs/user-create.input';

export interface IUserProvider {
  getUsers(): Promise<UserDto[]>;

  createUser(createInput: UserCreateInput): Promise<void>;
}
