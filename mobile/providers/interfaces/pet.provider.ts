import { PetDto } from '../dtos/pet.dto';
import { PetCreateInput } from '../inputs/pet-create.input';

export interface IPetProvider {
  getPets(): Promise<PetDto[]>;

  createPet(createInput: PetCreateInput): Promise<void>;
}
