import { Body, Controller, Get, Post } from '@nestjs/common';
import { TutorDto } from '../dtos/tutor.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTutorService } from '../service/create.service';
import { TutorCreateInput } from '../inputs/tutor-create.input';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import { FindTutorsService } from '../service/find.service';

@ApiTags('tutors')
@Controller('tutor')
export class TutorController {
  constructor(
    private readonly findTutorsService: FindTutorsService,
    private readonly createTutorService: CreateTutorService,
  ) {}

  /**
   * Get a list of all tutors.
   * @returns {TutorDto[]} - A list of tutor data.
   */
  @Get()
  @ApiOperation({ summary: 'Get all tutors' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of tutors.',
    type: [TutorDto],
  })
  getTutors(): Promise<TutorDto[]> {
    return this.findTutorsService.handle();
  }

  /**
   * Create a new tutor.
   * @param {TutorCreateInput} tutorCreateInput - The tutor data to create a new tutor.
   * @returns {CreateStatusDto} - The status of the tutor creation process.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new tutor' })
  @ApiBody({
    type: TutorCreateInput,
    description: 'The input data to create a new tutor.',
  })
  @ApiResponse({
    status: 201,
    description: 'Tutor successfully created.',
    type: CreateStatusDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid tutor data.',
    example: [
      {
        error_code: 'INVALID_DATA',
        error_description: 'There is already a tutor with this name',
      },
    ],
  })
  createTutor(
    @Body() tutorCreateInput: TutorCreateInput,
  ): Promise<CreateStatusDto> {
    return this.createTutorService.handle(tutorCreateInput);
  }
}
