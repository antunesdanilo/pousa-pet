import { BreedDto } from './breed.dto';
import { SpeciesDto } from './species.dto';
import { TutorDto } from './tutor.dto';

export interface PetDto {
  petId: string;
  tutorId: string;
  speciesId: string;
  breedId: string;
  name: string;
  // relations
  tutor: TutorDto;
  species: SpeciesDto;
  breed: BreedDto;
}
