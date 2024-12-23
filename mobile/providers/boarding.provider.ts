import { BaseApiProvider } from './base-api.provider';
import { BoardingDto } from './dtos/boarding.dto';
import { BoardingCreateInput } from './inputs/boarding-create.input';
import { IBoardingProvider } from './interfaces/boarding.provider';

export class BoardingProvider
  extends BaseApiProvider
  implements IBoardingProvider
{
  getBoardings(): Promise<BoardingDto[]> {
    return this.get<BoardingDto[]>('/boarding');
  }

  createBoarding(createInput: BoardingCreateInput): Promise<void> {
    return this.post<void, BoardingCreateInput>('/boarding', createInput);
  }
}
