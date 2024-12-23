import { BaseApiProvider } from './base-api.provider';
import { PetDto } from './dtos/pet.dto';
import { PetCreateInput } from './inputs/pet-create.input';
import { IPetProvider } from './interfaces/pet.provider';

export class PetProvider extends BaseApiProvider implements IPetProvider {
  getPets(): Promise<PetDto[]> {
    return this.get<PetDto[]>('/pet');
  }

  createPet(createInput: PetCreateInput): Promise<void> {
    return this.post<void, PetCreateInput>('/pet', createInput);
  }
}
