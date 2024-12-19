import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserFindManyService } from '../service/find-many.service';
import { UserFindByIdService } from '../service/find-by-id.service';
import { UserCreateService } from '../service/create.service';
import { CreateStatusDto } from 'src/app/dtos/create-status.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '../dtos/user.dto';
import { UserCreateInput } from '../inputs/user-create.input';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userFindManyService: UserFindManyService,
    private readonly userFindByIdService: UserFindByIdService,
    private readonly userCreateService: UserCreateService,
  ) {}

  /**
   * Get a list of all users.
   * @returns {UserDto[]} - A list of user data.
   */
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of users.',
    type: [UserDto],
  })
  getUsers(): Promise<UserDto[]> {
    return this.userFindManyService.handle();
  }

  /**
   * Get user details by user ID.
   * @param {string} userId - The unique identifier of the user.
   * @returns {UserDto} - The user data.
   */
  @Get(':userId')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({
    name: 'userId',
    required: true,
    type: String,
    description: 'The unique user ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user details.',
    type: UserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
    example: {
      error_code: 'USER_NOT_FOUND',
      error_description:
        'User with ID c79b55ff-92c1-4140-ad65-b4d0dda497de not found.',
    },
  })
  getUser(@Param('userId') userId: string): Promise<UserDto> {
    return this.userFindByIdService.handle(userId);
  }

  /**
   * Create a new user.
   * @param {UserCreateInput} userCreateInput - The user data to create a new user.
   * @returns {CreateStatusDto} - The status of the user creation process.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: UserCreateInput,
    description: 'The input data to create a new user.',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully created.',
    type: CreateStatusDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid user data.',
    example: [
      {
        error_code: 'INVALID_DATA',
        error_description: 'There is already a user with this name',
      },
    ],
  })
  createUser(
    @Body() userCreateInput: UserCreateInput,
  ): Promise<CreateStatusDto> {
    return this.userCreateService.handle(userCreateInput);
  }
}
