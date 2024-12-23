import { BaseApiProvider } from './base-api.provider';
import { BreedDto } from './dtos/breed.dto';
import { BreedCreateInput } from './inputs/breed-create.input';
import { IBreedProvider } from './interfaces/breed.provider';

export class BreedProvider extends BaseApiProvider implements IBreedProvider {
  getBreeds(): Promise<BreedDto[]> {
    return this.get<BreedDto[]>('/breed');
  }

  createBreed(createInput: BreedCreateInput): Promise<void> {
    return this.post<void, BreedCreateInput>('/breed', createInput);
  }
}
