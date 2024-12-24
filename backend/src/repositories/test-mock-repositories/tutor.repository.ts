import { Injectable } from '@nestjs/common';
import { TestMockRepository } from '../abstract-repositories/test.repository';
import { TutorDto } from 'src/modules/tutor/dtos/tutor.dto';
import { TutorCreateData } from '../create-data/tutor-create.data';
import { TutorRepository } from '../abstract-repositories/tutor.repository';

@Injectable()
export class TestMockTutorRepository
  implements TutorRepository, TestMockRepository<TutorDto>
{
  private tutors: TutorDto[] = [];

  injectData(data: TutorDto[]): void {
    this.tutors = data;
  }

  findMany = jest.fn().mockImplementation((): Promise<TutorDto[]> => {
    return Promise.resolve(this.tutors);
  });

  findById = jest
    .fn()
    .mockImplementation((tutorId: string): Promise<TutorDto | undefined> => {
      const tutor = this.tutors.find((u) => u.tutorId === tutorId);
      return Promise.resolve(tutor);
    });

  findByName = jest
    .fn()
    .mockImplementation((name: string): Promise<TutorDto | undefined> => {
      const tutor = this.tutors.find((t) => t.name === name);
      return Promise.resolve(tutor);
    });

  create = jest
    .fn()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .mockImplementation((_data: TutorCreateData): Promise<void> => {
      return Promise.resolve();
    });
}
