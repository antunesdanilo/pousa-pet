import { PetDto } from 'src/modules/pet/dtos/pet.dto';
import { PetCreateData } from '../create-data/pet-create.data';
import { PetFilterData } from '../filter-data/pet-filter.data';

export abstract class PetRepository {
  abstract findMany(filterData: PetFilterData): Promise<PetDto[]>;

  abstract findById(id: string): Promise<PetDto | undefined>;

  abstract findByName(name: string): Promise<PetDto | undefined>;

  abstract create(createData: PetCreateData): Promise<void>;
}
