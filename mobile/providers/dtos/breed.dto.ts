import { SpeciesDto } from './species.dto';

export interface BreedDto {
  breedId: string;
  speciesId: string;
  name: string;
  // relations
  species: SpeciesDto;
}
