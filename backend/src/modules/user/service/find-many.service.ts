import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/abstract-repositories/user.repository';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UserFindManyService {
  /**
   * Constructor for UserFindManyService.
   * Injects the UserRepository to retrieve multiple user data.
   *
   * @param userRepository - The UserRepository used to query user data from the database.
   */
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Handles the retrieval of all users from the repository.
   *
   * This method fetches all users from the database and returns the list of users.
   *
   * @returns A promise that resolves to an array of UserDto objects containing user details.
   */
  async handle(): Promise<UserDto[]> {
    // Fetching all users from the repository
    const users = this.userRepository.findMany();

    // Return the list of users
    return users;
  }
}
