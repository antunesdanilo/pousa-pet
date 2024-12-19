import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import { PetRepository } from 'src/repositories/abstract-repositories/pet.repository';
import { UserRepository } from 'src/repositories/abstract-repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';
import { BoardingCreateInput } from '../inputs/boarding-create.input';
import { BoardingCreateData } from 'src/repositories/create-data/boarding-create.data';
import { BoardingRepository } from 'src/repositories/abstract-repositories/boarding.repository';

/**
 * Service to handle the creation of boardings.
 */
@Injectable()
export class CreateBoardingService {
  constructor(
    private readonly petRepository: PetRepository,
    private readonly userRepository: UserRepository,
    private readonly boardingRepository: BoardingRepository,
  ) {}

  /**
   * Handles the creation of a boarding.
   *
   * @param createInput - Input data required to create a boarding.
   * @returns A CreateStatusDto indicating success or failure.
   * @throws HttpException if validation fails or a required entity is not found.
   */
  async handle(createInput: BoardingCreateInput): Promise<CreateStatusDto> {
    // Verify the existence of the pet
    const pet = await this.petRepository.findById(createInput.petId);

    if (!pet) {
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: `O pet com o ID ${createInput.petId} não foi encontrado.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Verify the existence of the user
    const user = await this.userRepository.findById(
      createInput.insertedByUserId,
    );

    if (!user) {
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: `O usuário com o ID ${createInput.insertedByUserId} não foi encontrado.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Prepare pet data for creation
    const createData: BoardingCreateData = {
      boardingId: uuidv4(),
      petId: createInput.petId,
      checkInDate: createInput.checkInDate,
      expectedDailyStays: createInput.expectedDailyStays,
      insertedByUserId: createInput.insertedByUserId,
    };

    // Persist the boarding data in the repository
    this.boardingRepository.create(createData);

    return { success: true };
  }
}
