import { SpeciesDto } from '../dtos/species.dto';
import { SpeciesCreateInput } from '../inputs/species-create.input';

export interface ISpeciesProvider {
  getSpecies(): Promise<SpeciesDto[]>;

  createSpecies(createInput: SpeciesCreateInput): Promise<void>;
}
