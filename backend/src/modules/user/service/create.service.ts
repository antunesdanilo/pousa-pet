import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import { UserRepository } from 'src/repositories/abstract-repositories/user.repository';
import { UserCreateInput } from '../inputs/user-create.input';
import { UserCreateData } from 'src/repositories/create-data/user-create.data';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserCreateService {
  // Injecting the UserRepository to interact with user data
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Handles the creation of a new user.
   *
   * This method checks if a user with the provided name already exists.
   * If the user exists, it throws a BAD_REQUEST error.
   * If the user doesn't exist, it creates a new user record and returns a success status.
   *
   * @param createInput - The data needed to create a new user (ID and name).
   * @returns A promise that resolves to a CreateStatusDto indicating success.
   * @throws HttpException if a user with the same name already exists.
   */
  async handle(createInput: UserCreateInput): Promise<CreateStatusDto> {
    // Checking if a user with the same name already exists
    const user = await this.userRepository.findByName(createInput.name);

    if (user) {
      // Throwing an error if a user with the same name exists
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: 'Já existe um usúario com este nome',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Preparing the data for user creation
    const createData: UserCreateData = {
      userId: uuidv4(),
      name: createInput.name,
    };

    // Creating the user record in the repository
    await this.userRepository.create(createData);

    // Returning a success statu
    return { success: true };
  }
}
