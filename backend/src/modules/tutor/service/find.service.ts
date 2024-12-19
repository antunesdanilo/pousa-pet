import { Injectable } from '@nestjs/common';
import { TutorDto } from '../dtos/tutor.dto';
import { TutorRepository } from 'src/repositories/abstract-repositories/tutor.repository';

@Injectable()
export class FindTutorsService {
  // Injecting the TutorRepository to access tutor data
  constructor(private readonly tutorRepository: TutorRepository) {}

  /**
   * Handles the retrieval of all tutors.
   *
   * This method uses the tutor repository to fetch a list of all tutors.
   * It returns an array of TutorDto objects representing the tutors.
   *
   * @returns A promise that resolves to an array of TutorDto objects.
   */
  async handle(): Promise<TutorDto[]> {
    // Fetching all tutors from the repository
    const tutors = this.tutorRepository.findMany();

    // Returning the list of tutors
    return tutors;
  }
}
