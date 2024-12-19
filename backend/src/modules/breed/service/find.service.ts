import { Injectable } from '@nestjs/common';
import { BreedRepository } from 'src/repositories/abstract-repositories/breed.repository';
import { BreedDto } from '../dtos/breed.dto';

@Injectable()
export class FindBreedsService {
  // Injecting the BreedRepository to access breed data
  constructor(private readonly breedRepository: BreedRepository) {}

  /**
   * Handles the retrieval of all breeds.
   *
   * This method uses the breed repository to fetch a list of all breeds.
   * It returns an array of BreedDto objects representing the breeds.
   *
   * @returns A promise that resolves to an array of BreedDto objects.
   */
  async handle(): Promise<BreedDto[]> {
    // Fetching all breeds from the repository
    const breeds = this.breedRepository.findMany();

    // Returning the list of breeds
    return breeds;
  }
}
