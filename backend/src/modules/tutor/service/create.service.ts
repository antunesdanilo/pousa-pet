import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import { TutorRepository } from 'src/repositories/abstract-repositories/tutor.repository';
import { TutorCreateInput } from '../inputs/tutor-create.input';
import { TutorCreateData } from 'src/repositories/create-data/tutor-create.data';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateTutorService {
  // Injecting the TutorRepository to interact with tutor data
  constructor(private readonly tutorRepository: TutorRepository) {}

  /**
   * Handles the creation of a new tutor.
   *
   * This method checks if a tutor with the provided name already exists.
   * If the tutor exists, it throws a BAD_REQUEST error.
   * If the tutor doesn't exist, it creates a new tutor record and returns a success status.
   *
   * @param createInput - The data needed to create a new tutor (ID, name and phoneNumber).
   * @returns A promise that resolves to a CreateStatusDto indicating success.
   * @throws HttpException if a tutor with the same name already exists.
   */
  async handle(createInput: TutorCreateInput): Promise<CreateStatusDto> {
    // Checking if a tutor with the same name already exists
    const tutor = await this.tutorRepository.findByName(createInput.name);

    if (tutor) {
      // Throwing an error if a tutor with the same name exists
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: 'Já existe um tutor com este nome',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Preparing the data for tutor creation
    const createData: TutorCreateData = {
      tutorId: uuidv4(),
      name: createInput.name,
      phoneNumber: createInput.phoneNumber,
    };

    // Creating the tutor record in the repository
    await this.tutorRepository.create(createData);

    // Returning a success statu
    return { success: true };
  }
}
