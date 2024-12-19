import { BreedDto } from 'src/modules/breed/dtos/breed.dto';
import { BreedCreateData } from '../create-data/breed-create.data';

export abstract class BreedRepository {
  abstract findMany(): Promise<BreedDto[]>;

  abstract findById(id: string): Promise<BreedDto | undefined>;

  abstract findByName(name: string): Promise<BreedDto | undefined>;

  abstract create(createData: BreedCreateData): Promise<void>;
}
