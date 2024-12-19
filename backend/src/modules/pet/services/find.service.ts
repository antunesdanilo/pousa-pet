import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PetDto } from '../dtos/pet.dto';
import { PetRepository } from 'src/repositories/abstract-repositories/pet.repository';
import { PetFilterData } from 'src/repositories/filter-data/pet-filter.data';
import { TutorRepository } from 'src/repositories/abstract-repositories/tutor.repository';

@Injectable()
export class FindPetsService {
  // Injecting the PetsRepository to access pet data
  constructor(
    private readonly petRepository: PetRepository,
    private readonly tutorRepository: TutorRepository,
  ) {}

  /**
   * Handles the retrieval of all pets.
   *
   * This method uses the pets repository to fetch a list of all pets.
   * It returns an array of PetDto objects representing the pets.
   *
   * @returns A promise that resolves to an array of PetsDto objects.
   */
  async handle(tutorId?: string): Promise<PetDto[]> {
    const filterData: PetFilterData = {};

    if (tutorId !== undefined) {
      const tutor = await this.tutorRepository.findById(tutorId);

      if (!tutor) {
        throw new HttpException(
          {
            error_code: 'INVALID_DATA',
            error_description: `O tutor com o ID ${tutorId} não foi encontrado.`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      filterData.tutorId = tutorId;
    }

    // Fetching all pets from the repository
    const pets = this.petRepository.findMany(filterData);

    // Returning the list of pets
    return pets;
  }
}
