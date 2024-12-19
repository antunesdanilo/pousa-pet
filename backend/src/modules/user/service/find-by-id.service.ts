import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/abstract-repositories/user.repository';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UserFindByIdService {
  /**
   * Constructor for UserFindByIdService.
   * Injects the UserRepository to retrieve user data.
   *
   * @param userRepository - The UserRepository used to query user data from the database.
   */
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Handles the retrieval of a user by their ID.
   *
   * This method checks if a user with the given ID exists in the database.
   * If the user is found, it returns the user data.
   * If the user is not found, it throws a NOT_FOUND error.
   *
   * @param id - The unique identifier of the user to be retrieved.
   * @returns A promise that resolves to the UserDto object containing the user's details.
   * @throws HttpException if the user with the specified ID is not found (USER_NOT_FOUND).
   */
  async handle(userId: string): Promise<UserDto> {
    // Attempt to find the user by ID
    const user = await this.userRepository.findById(userId);

    // If user is not found, throw a NOT_FOUND error
    if (!user) {
      throw new HttpException(
        {
          error_code: 'USER_NOT_FOUND',
          error_description: `O usuário com o ID ${userId} não foi encontrado.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // Return the user data
    return user;
  }
}
