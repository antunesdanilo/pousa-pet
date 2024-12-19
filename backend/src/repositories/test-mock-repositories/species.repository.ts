import { Injectable } from '@nestjs/common';
import { TestMockRepository } from '../abstract-repositories/test.repository';
import { SpeciesRepository } from '../abstract-repositories/species.repository';
import { SpeciesDto } from 'src/modules/species/dtos/species.dto';
import { SpeciesCreateData } from '../create-data/species-create.data';

@Injectable()
export class TestMockSpeciesRepository
  implements SpeciesRepository, TestMockRepository<SpeciesDto>
{
  private species: SpeciesDto[] = [];

  injectData(data: SpeciesDto[]): void {
    this.species = [...this.species, ...data];
  }

  findMany = jest.fn().mockImplementation((): Promise<SpeciesDto[]> => {
    return Promise.resolve(this.species);
  });

  findById = jest
    .fn()
    .mockImplementation(
      (speciesId: string): Promise<SpeciesDto | undefined> => {
        const species = this.species.find((s) => s.speciesId === speciesId);
        return Promise.resolve(species);
      },
    );

  findByName = jest
    .fn()
    .mockImplementation((name: string): Promise<SpeciesDto | undefined> => {
      const species = this.species.find((s) => s.name === name);
      return Promise.resolve(species);
    });

  create = jest
    .fn()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .mockImplementation((_data: SpeciesCreateData): Promise<void> => {
      return Promise.resolve();
    });
}
