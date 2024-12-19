export abstract class TestMockRepository<T> {
  abstract injectData(data: T[]): void;
}
