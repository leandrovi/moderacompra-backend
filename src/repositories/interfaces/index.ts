export interface IRepository<T> {
  create(item: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
  find(): Promise<T[]>;
  findAndCountAll(options: object): Promise<{ count: number; rows: T[] }>;
  findById(id: string): Promise<T>;
  findByEmail?(email: string): Promise<T>;
}
