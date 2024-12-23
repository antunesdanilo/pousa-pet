import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PetCreateInput } from '../inputs/pet-create.input';
import { CreatePetService } from '../services/create.service';
import { FindPetsService } from '../services/find.service';
import { PetDto } from '../dtos/pet.dto';

@ApiTags('pets')
@Controller('pet')
export class PetController {
  constructor(
    private readonly findPetsService: FindPetsService,
    private readonly createPetService: CreatePetService,
  ) {}

  /**
   * Get a list of pets based on optional tutor ID.
   * @param {string} [tutorId] - The optional tutor ID to filter pets.
   * @returns {PetDto[]} - The pet list.
   */
  @Get()
  @ApiOperation({ summary: 'Get pet list by optional tutor ID' })
  @ApiParam({
    name: 'tutorId',
    required: false,
    type: String,
    description: 'Optional tutor ID whose list of pets is being requested.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the pets list.',
    type: [PetDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid tutor ID.',
    example: [
      {
        error_code: 'INVALID_DATA',
        error_description:
          'O tutor com o ID dc49b5ef-c085-4c05-a2b4-094dbbd7464c não foi encontrado.',
      },
    ],
  })
  getPets(@Query('tutorId') tutorId?: string | undefined): Promise<PetDto[]> {
    return this.findPetsService.handle(tutorId);
  }

  /**
   * Create a pet.
   * @param {PetCreateInput} petCreateInput - The input data to create a new pet.
   * @returns {CreateStatusDto} - The status of the creation process.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new pet' })
  @ApiBody({
    type: PetCreateInput,
    description: 'The input data to create a new pet.',
  })
  @ApiResponse({
    status: 201,
    description: 'Pet successfully created and confirmed.',
    type: CreateStatusDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid pet data.',
    example: [
      {
        error_code: 'INVALID_DATA',
        error_description: 'Já existe um pet cadastrado com este nome',
      },
      {
        error_code: 'INVALID_DATA',
        error_description:
          'O tutor com o ID e02a25a6-052a-4d44-b685-9682391b331d não foi encontrado.',
      },
      {
        error_code: 'INVALID_DATA',
        error_description:
          'A espécie com o ID e02a25a6-052a-4d44-b685-9682391b331d não foi encontrada.',
      },
      {
        error_code: 'INVALID_DATA',
        error_description:
          'A raça com o ID e02a25a6-052a-4d44-b685-9682391b331d não foi encontrada.',
      },
    ],
  })
  async createPet(
    @Body() petCreateInput: PetCreateInput,
  ): Promise<CreateStatusDto> {
    return this.createPetService.handle(petCreateInput);
  }
}
