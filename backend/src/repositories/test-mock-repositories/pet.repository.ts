import { Injectable } from '@nestjs/common';
import { TestMockRepository } from '../abstract-repositories/test.repository';
import { PetDto } from 'src/modules/pet/dtos/pet.dto';
import { PetRepository } from '../abstract-repositories/pet.repository';
import { PetCreateData } from '../create-data/pet-create.data';

@Injectable()
export class TestMockPetRepository
  implements PetRepository, TestMockRepository<PetDto>
{
  private pets: PetDto[] = [];

  injectData(data: PetDto[]): void {
    this.pets = data;
  }

  findMany = jest.fn().mockImplementation((): Promise<PetDto[]> => {
    return Promise.resolve(this.pets);
  });

  findById = jest
    .fn()
    .mockImplementation((petId: string): Promise<PetDto | undefined> => {
      const pet = this.pets.find((p) => p.petId === petId);
      return Promise.resolve(pet);
    });

  findByName = jest
    .fn()
    .mockImplementation((name: string): Promise<PetDto | undefined> => {
      const pet = this.pets.find((p) => p.name === name);
      return Promise.resolve(pet);
    });

  create = jest
    .fn()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .mockImplementation((_data: PetCreateData): Promise<void> => {
      return Promise.resolve();
    });
}
