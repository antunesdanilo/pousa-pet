import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBoardingService } from '../services/create.service';
import { BoardingDto } from '../dtos/boarding.dto';
import { FindBoardingsService } from '../services/find.service';
import { BoardingCreateInput } from '../inputs/boarding-create.input';

@ApiTags('boardings')
@Controller('boarding')
export class BoardingController {
  constructor(
    private readonly findBoardingsService: FindBoardingsService,
    private readonly createBoardingService: CreateBoardingService,
  ) {}

  /**
   * Get boardings list based on optional tutor ID.
   * @param {string} tutorId - The optional tutor ID to filter pets.
   * @returns {BoardingDto[]} - The pets list.
   */
  @Get(':tutorId')
  @ApiOperation({ summary: 'Get pets list filtered by optional tutor ID' })
  @ApiParam({
    name: 'tutorId',
    required: false,
    type: String,
    description: 'The tutor ID to filter pets.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the pets list.',
    type: [BoardingDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid tutor ID.',
    example: [
      {
        error_code: 'INVALID_CUSTOMER',
        error_description:
          'Customer with id dc49b5ef-c085-4c05-a2b4-094dbbd7464c not found.',
      },
      {
        error_code: 'INVALID_DRIVER',
        error_description: 'Driver with id 4 not found.',
      },
    ],
  })
  getBoardings(
    @Query('tutorId') tutorId?: string | undefined,
  ): Promise<BoardingDto[]> {
    return this.findBoardingsService.handle(tutorId);
  }

  /**
   * Create a new boarding.
   * @param {BoardingCreateInput} boardingCreateInput - The input data to create a new boarding.
   * @returns {CreateStatusDto} - The status of the creation process.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new boarding' })
  @ApiBody({
    type: BoardingCreateInput,
    description: 'The input data to create a new boarding.',
  })
  @ApiResponse({
    status: 201,
    description: 'Boarding successfully created.',
    type: CreateStatusDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data for boarding creation.',
    example: [
      {
        error_code: 'INVALID_DATA',
        error_description:
          'O pet com o ID e02a25a6-052a-4d44-b685-9682391b331d não foi encontrado.',
      },
      {
        error_code: 'INVALID_DATA',
        error_description:
          'O usuário com o ID e02a25a6-052a-4d44-b685-9682391b331d não foi encontrado.',
      },
    ],
  })
  async createBoarding(
    @Body() boardingCreateInput: BoardingCreateInput,
  ): Promise<CreateStatusDto> {
    return this.createBoardingService.handle(boardingCreateInput);
  }
}
