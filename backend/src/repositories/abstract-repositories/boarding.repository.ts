import { BoardingDto } from 'src/modules/boarding/dtos/boarding.dto';
import { BoardingCreateData } from '../create-data/boarding-create.data';
import { BoardingFilterData } from '../filter-data/boarding-filter.data';

export abstract class BoardingRepository {
  abstract findMany(filterData: BoardingFilterData): Promise<BoardingDto[]>;

  abstract findById(id: string): Promise<BoardingDto | undefined>;

  abstract create(createData: BoardingCreateData): Promise<void>;
}
