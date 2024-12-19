import { SpeciesDto } from 'src/modules/species/dtos/species.dto';
import { SpeciesCreateData } from '../create-data/species-create.data';

export abstract class SpeciesRepository {
  abstract findMany(): Promise<SpeciesDto[]>;

  abstract findById(id: string): Promise<SpeciesDto | undefined>;

  abstract findByName(name: string): Promise<SpeciesDto | undefined>;

  abstract create(createData: SpeciesCreateData): Promise<void>;
}
