import { BoardingDto } from '../dtos/boarding.dto';
import { BoardingCreateInput } from '../inputs/boarding-create.input';

export interface IBoardingProvider {
  getBoardings(): Promise<BoardingDto[]>;

  createBoarding(createInput: BoardingCreateInput): Promise<void>;
}
