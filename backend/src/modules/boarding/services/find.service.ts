import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BoardingRepository } from 'src/repositories/abstract-repositories/boarding.repository';
import { BoardingDto } from '../dtos/boarding.dto';
import { TutorRepository } from 'src/repositories/abstract-repositories/tutor.repository';
import { BoardingFilterData } from 'src/repositories/filter-data/boarding-filter.data';

/**
 * Service to find boardings optionally filtered by a specific tutor.
 * It retrieves rides from the `BoardingRepository` based on the provided tutor ID.
 *
 * @class FindBoardingsService
 */
@Injectable()
export class FindBoardingsService {
  constructor(
    private readonly boardingRepository: BoardingRepository,
    private readonly tutorRepository: TutorRepository,
  ) {}

  /**
   * Retrieves a list of boardings for a given customer, optionally filtered by driver ID.
   *
   * @param {string} tutorId - The optional ID of the tutor whose boarding are to be fetched.
   *
   * @throws {HttpException} Throws an error if the tutor (if specified) is not found.
   *
   * @returns {Promise<BoardingDto[]>} Returns a `BoardingDto` list.
   */
  async handle(tutorId?: string): Promise<BoardingDto[]> {
    const filterData: BoardingFilterData = {};

    if (tutorId !== undefined) {
      const tutor = await this.tutorRepository.findById(tutorId);

      if (!tutor) {
        throw new HttpException(
          {
            error_code: 'INVALID_DATA',
            error_description: `O tutor com o ID ${tutorId} não foi encontrado.`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      filterData.tutorId = tutorId;
    }

    const boardings = await this.boardingRepository.findMany(filterData);

    return boardings;
  }
}
