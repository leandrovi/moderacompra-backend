export interface IRepository<T> {
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<boolean>;
  find(): Promise<T[]>;
  findOne(id: string): Promise<T>;
}
