import { UserDto } from 'src/modules/user/dtos/user.dto';
import { UserCreateData } from '../create-data/user-create.data';

export abstract class UserRepository {
  abstract findMany(): Promise<UserDto[]>;

  abstract findById(id: string): Promise<UserDto | undefined>;

  abstract findByName(name: string): Promise<UserDto | undefined>;

  abstract create(createData: UserCreateData): Promise<void>;
}
