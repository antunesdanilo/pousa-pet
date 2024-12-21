import { BaseApiProvider } from './base-api.provider';
import { TutorDto } from './dtos/tutor.dto';
import { TutorCreateInput } from './inputs/tutor-create.input';
import { ITutorProvider } from './interfaces/tutor.provider';

export class TutorProvider extends BaseApiProvider implements ITutorProvider {
  getTutors(): Promise<TutorDto[]> {
    return this.get<TutorDto[]>('/tutor');
  }

  createTutor(createInput: TutorCreateInput): Promise<void> {
    return this.post<void, TutorCreateInput>('/tutor', createInput);
  }
}
