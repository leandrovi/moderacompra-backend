export interface ProductScrap {
  description: string;
  code: string;
  quantity: number;
  unity_measure: string;
  unitary_value: number;
}

export interface ListScrap {
  products: ProductScrap[];
  totalCount: number;
}
