import { Injectable } from '@nestjs/common';
import { TestMockRepository } from '../abstract-repositories/test.repository';
import { BoardingRepository } from '../abstract-repositories/boarding.repository';
import { BoardingDto } from 'src/modules/boarding/dtos/boarding.dto';
import { BoardingCreateData } from '../create-data/boarding-create.data';

@Injectable()
export class TestMockBoardingRepository
  implements BoardingRepository, TestMockRepository<BoardingDto>
{
  private boardings: BoardingDto[] = [];

  injectData(data: BoardingDto[]): void {
    this.boardings = data;
  }

  findMany = jest.fn().mockImplementation((): Promise<BoardingDto[]> => {
    return Promise.resolve(this.boardings);
  });

  findById = jest
    .fn()
    .mockImplementation(
      (boardingId: string): Promise<BoardingDto | undefined> => {
        const boarding = this.boardings.find(
          (b) => b.boardingId === boardingId,
        );
        return Promise.resolve(boarding);
      },
    );

  create = jest
    .fn()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .mockImplementation((_data: BoardingCreateData): Promise<void> => {
      return Promise.resolve();
    });
}
