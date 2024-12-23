import { BaseApiProvider } from './base-api.provider';
import { SpeciesDto } from './dtos/species.dto';
import { SpeciesCreateInput } from './inputs/species-create.input';
import { ISpeciesProvider } from './interfaces/species.provider';

export class SpeciesProvider
  extends BaseApiProvider
  implements ISpeciesProvider
{
  getSpecies(): Promise<SpeciesDto[]> {
    return this.get<SpeciesDto[]>('/species');
  }

  createSpecies(createInput: SpeciesCreateInput): Promise<void> {
    return this.post<void, SpeciesCreateInput>('/species', createInput);
  }
}
