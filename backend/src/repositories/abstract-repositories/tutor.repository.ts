import { TutorDto } from 'src/modules/tutor/dtos/tutor.dto';
import { TutorCreateData } from '../create-data/tutor-create.data';

export abstract class TutorRepository {
  abstract findMany(): Promise<TutorDto[]>;

  abstract findById(id: string): Promise<TutorDto | undefined>;

  abstract findByName(name: string): Promise<TutorDto | undefined>;

  abstract create(createData: TutorCreateData): Promise<void>;
}
