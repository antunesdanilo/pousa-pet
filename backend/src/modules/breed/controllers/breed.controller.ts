import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import { CreateBreedService } from '../service/create.service';
import { FindBreedsService } from '../service/find.service';
import { BreedDto } from '../dtos/breed.dto';
import { BreedCreateInput } from '../inputs/breed-create.input';

@ApiTags('breeds')
@Controller('breed')
export class BreedController {
  constructor(
    private readonly findBreedsService: FindBreedsService,
    private readonly createBreedService: CreateBreedService,
  ) {}

  /**
   * Get a list of all breeds.
   * @returns {BreedDto[]} - A list of breed data.
   */
  @Get()
  @ApiOperation({ summary: 'Get all breeds' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of breeds.',
    type: [BreedDto],
  })
  getBreeds(): Promise<BreedDto[]> {
    return this.findBreedsService.handle();
  }

  /**
   * Create a new breed.
   * @param {BreedCreateInput} breedCreateInput - The breed data to create a new breed.
   * @returns {CreateStatusDto} - The status of the user creation process.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new breed' })
  @ApiBody({
    type: BreedCreateInput,
    description: 'The input data to create a new breed.',
  })
  @ApiResponse({
    status: 201,
    description: 'Breed successfully created.',
    type: CreateStatusDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid breed data.',
    example: [
      {
        error_code: 'INVALID_DATA',
        error_description: 'There is already a breed with this name',
      },
    ],
  })
  createUser(
    @Body() breedCreateInput: BreedCreateInput,
  ): Promise<CreateStatusDto> {
    return this.createBreedService.handle(breedCreateInput);
  }
}
