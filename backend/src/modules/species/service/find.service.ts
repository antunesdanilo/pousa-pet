import { Injectable } from '@nestjs/common';
import { SpeciesDto } from '../dtos/species.dto';
import { SpeciesRepository } from 'src/repositories/abstract-repositories/species.repository';

@Injectable()
export class FindSpeciesService {
  // Injecting the SpeciesRepository to access species data
  constructor(private readonly speciesRepository: SpeciesRepository) {}

  /**
   * Handles the retrieval of all species.
   *
   * This method uses the species repository to fetch a list of all species.
   * It returns an array of SpeciesDto objects representing the species.
   *
   * @returns A promise that resolves to an array of SpeciesDto objects.
   */
  async handle(): Promise<SpeciesDto[]> {
    // Fetching all species from the repository
    const species = this.speciesRepository.findMany();

    // Returning the list of species
    return species;
  }
}
