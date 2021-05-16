export interface IRepository<T> {
  create(item: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
  find(filter?: Partial<T>): Promise<T[]>;
  findAndCountAll(
    options: object,
    filter?: Partial<T>
  ): Promise<{ count: number; rows: T[] }>;
  findById(id: string): Promise<T>;
  findByEmail?(email: string): Promise<T>;
  findByName(name: string): Promise<T>;
}
