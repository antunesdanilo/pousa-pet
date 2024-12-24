import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import { v4 as uuidv4 } from 'uuid';
import { BreedRepository } from 'src/repositories/abstract-repositories/breed.repository';
import { BreedCreateInput } from '../inputs/breed-create.input';
import { BreedCreateData } from 'src/repositories/create-data/breed-create.data';
import { SpeciesRepository } from 'src/repositories/abstract-repositories/species.repository';

@Injectable()
export class CreateBreedService {
  // Injecting the BreedRepository to interact with breed data
  constructor(
    private readonly breedRepository: BreedRepository,
    private readonly speciesRepository: SpeciesRepository,
  ) {}

  /**
   * Handles the creation of a new breed.
   *
   * This method checks if a breed with the provided name already exists.
   * If the breed exists, it throws a BAD_REQUEST error.
   * If the breed doesn't exist, it creates a new breed record and returns a success status.
   *
   * @param createInput - The data needed to create a new breed (breedId, speciesId, name).
   * @returns A promise that resolves to a CreateStatusDto indicating success.
   * @throws HttpException if a breed with the same name already exists.
   */
  async handle(createInput: BreedCreateInput): Promise<CreateStatusDto> {
    // Checking if a breed with the same name already exists
    const breed = await this.breedRepository.findByName(createInput.name);

    // Checking if the speciesId exists
    const species = await this.speciesRepository.findById(
      createInput.speciesId,
    );

    if (!species) {
      // Throwing an error if species not exists
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: `A espécie de ID ${createInput.speciesId} não foi encontrada`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (breed && breed.speciesId === createInput.speciesId) {
      // Throwing an error if a breed with the same name and same speciesId exists
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: 'Já existe uma raça com este nome',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Preparing the data for breed creation
    const createData: BreedCreateData = {
      breedId: uuidv4(),
      speciesId: createInput.speciesId,
      name: createInput.name,
    };

    // Creating the breed record in the repository
    await this.breedRepository.create(createData);

    // Returning a success status
    return { success: true };
  }
}
