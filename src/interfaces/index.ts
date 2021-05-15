export interface RequestOptions {
  limit?: number;
  offset?: number;
  order?: any;
}

export interface GetAllResponse<T> {
  count: number;
  rows: T[];
}
