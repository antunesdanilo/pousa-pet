import { TutorDto } from '../dtos/tutor.dto';
import { TutorCreateInput } from '../inputs/tutor-create.input';

export interface ITutorProvider {
  getTutors(): Promise<TutorDto[]>;

  createTutor(createInput: TutorCreateInput): Promise<void>;
}
