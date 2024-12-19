import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpeciesDto } from '../dtos/species.dto';
import { SpeciesCreateInput } from '../inputs/species-create.input';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import { CreateSpeciesService } from '../service/create.service';
import { FindSpeciesService } from '../service/find.service';

@ApiTags('species')
@Controller('species')
export class SpeciesController {
  constructor(
    private readonly findSpeciesService: FindSpeciesService,
    private readonly createSpeciesService: CreateSpeciesService,
  ) {}

  /**
   * Get a list of all species.
   * @returns {SpeciesDto[]} - A list of species data.
   */
  @Get()
  @ApiOperation({ summary: 'Get all species' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of species.',
    type: [SpeciesDto],
  })
  getSpecies(): Promise<SpeciesDto[]> {
    return this.findSpeciesService.handle();
  }

  /**
   * Create a new user.
   * @param {UserCreateInput} userCreateInput - The user data to create a new user.
   * @returns {CreateStatusDto} - The status of the user creation process.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new species' })
  @ApiBody({
    type: SpeciesCreateInput,
    description: 'The input data to create a new species.',
  })
  @ApiResponse({
    status: 201,
    description: 'Species successfully created.',
    type: CreateStatusDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid species data.',
    example: [
      {
        error_code: 'INVALID_DATA',
        error_description: 'There is already a species with this name',
      },
    ],
  })
  createUser(
    @Body() userCreateInput: SpeciesCreateInput,
  ): Promise<CreateStatusDto> {
    return this.createSpeciesService.handle(userCreateInput);
  }
}
