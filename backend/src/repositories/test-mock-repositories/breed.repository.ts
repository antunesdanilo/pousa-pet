import { Injectable } from '@nestjs/common';
import { TestMockRepository } from '../abstract-repositories/test.repository';
import { BreedDto } from 'src/modules/breed/dtos/breed.dto';
import { BreedRepository } from '../abstract-repositories/breed.repository';
import { BreedCreateData } from '../create-data/breed-create.data';

@Injectable()
export class TestMockBreedRepository
  implements BreedRepository, TestMockRepository<BreedDto>
{
  private breeds: BreedDto[] = [];

  injectData(data: BreedDto[]): void {
    this.breeds = [...this.breeds, ...data];
  }

  findMany = jest.fn().mockImplementation((): Promise<BreedDto[]> => {
    return Promise.resolve(this.breeds);
  });

  findById = jest
    .fn()
    .mockImplementation((breedId: string): Promise<BreedDto | undefined> => {
      const breed = this.breeds.find((b) => b.breedId === breedId);
      return Promise.resolve(breed);
    });

  findByName = jest
    .fn()
    .mockImplementation((name: string): Promise<BreedDto | undefined> => {
      const breed = this.breeds.find((b) => b.name === name);
      return Promise.resolve(breed);
    });

  create = jest
    .fn()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .mockImplementation((_data: BreedCreateData): Promise<void> => {
      return Promise.resolve();
    });
}
