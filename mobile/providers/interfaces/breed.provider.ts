import { BreedDto } from '../dtos/breed.dto';
import { BreedCreateInput } from '../inputs/breed-create.input';

export interface IBreedProvider {
  getBreeds(): Promise<BreedDto[]>;

  createBreed(createInput: BreedCreateInput): Promise<void>;
}
