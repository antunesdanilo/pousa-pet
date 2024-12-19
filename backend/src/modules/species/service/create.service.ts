import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import { v4 as uuidv4 } from 'uuid';
import { SpeciesRepository } from 'src/repositories/abstract-repositories/species.repository';
import { SpeciesCreateInput } from '../inputs/species-create.input';
import { SpeciesCreateData } from 'src/repositories/create-data/species-create.data';

@Injectable()
export class CreateSpeciesService {
  // Injecting the SpeciesRepository to interact with species data
  constructor(private readonly speciesRepository: SpeciesRepository) {}

  /**
   * Handles the creation of a new species.
   *
   * This method checks if a specie with the provided name already exists.
   * If the species exists, it throws a BAD_REQUEST error.
   * If the species doesn't exist, it creates a new species record and returns a success status.
   *
   * @param createInput - The data needed to create a new species (ID, name).
   * @returns A promise that resolves to a CreateStatusDto indicating success.
   * @throws HttpException if a species with the same name already exists.
   */
  async handle(createInput: SpeciesCreateInput): Promise<CreateStatusDto> {
    // Checking if a species with the same name already exists
    const species = await this.speciesRepository.findByName(createInput.name);

    if (species) {
      // Throwing an error if a species with the same name exists
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: 'Já existe uma espécie com este nome',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Preparing the data for species creation
    const createData: SpeciesCreateData = {
      speciesId: uuidv4(),
      name: createInput.name,
    };

    // Creating the species record in the repository
    await this.speciesRepository.create(createData);

    // Returning a success statu
    return { success: true };
  }
}
