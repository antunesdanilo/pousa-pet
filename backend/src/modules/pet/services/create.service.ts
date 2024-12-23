import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import { PetRepository } from 'src/repositories/abstract-repositories/pet.repository';
import { PetCreateInput } from '../inputs/pet-create.input';
import { TutorRepository } from 'src/repositories/abstract-repositories/tutor.repository';
import { SpeciesRepository } from 'src/repositories/abstract-repositories/species.repository';
import { BreedRepository } from 'src/repositories/abstract-repositories/breed.repository';
import { PetCreateData } from 'src/repositories/create-data/pet-create.data';
import { v4 as uuidv4 } from 'uuid';

/**
 * Service to handle the creation and confirmation of rides.
 */
@Injectable()
export class CreatePetService {
  constructor(
    private readonly petRepository: PetRepository,
    private readonly tutorRepository: TutorRepository,
    private readonly speciesRepository: SpeciesRepository,
    private readonly breedRepository: BreedRepository,
  ) {}

  /**
   * Handles the creation and confirmation of a pet.
   *
   * @param createInput - Input data required to create a pet.
   * @returns A CreateStatusDto indicating success or failure.
   * @throws HttpException if validation fails or a required entity is not found.
   */
  async handle(createInput: PetCreateInput): Promise<CreateStatusDto> {
    // Checking if a pet with the same name already exists
    const pet = await this.petRepository.findByName(createInput.name);

    if (pet) {
      // Throwing an error if a pet with the same name exists
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: 'Já existe um pet cadastrado com este nome.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Verify the existence of the tutor
    const tutor = await this.tutorRepository.findById(createInput.tutorId);

    if (!tutor) {
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: `O tutor com o ID ${createInput.tutorId} não foi encontrado.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Verify the existence of the species
    const species = await this.speciesRepository.findById(
      createInput.speciesId,
    );

    if (!species) {
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: `A espécie com o ID ${createInput.speciesId} não foi encontrada.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Verify the existence of the breed
    const breed = await this.breedRepository.findById(createInput.breedId);

    if (!breed || breed.speciesId !== createInput.speciesId) {
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: `A raça com o ID ${createInput.breedId} não foi encontrada ou não pertence à espécie informada.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Prepare pet data for creation
    const createData: PetCreateData = {
      petId: uuidv4(),
      tutorId: createInput.tutorId,
      speciesId: createInput.speciesId,
      breedId: createInput.breedId,
      name: createInput.name,
    };

    // Persist the ride data in the repository
    await this.petRepository.create(createData);

    return { success: true };
  }
}
