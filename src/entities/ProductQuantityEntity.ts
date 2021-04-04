export class ProductQuantityEntity {
  public id?: string;
  public list_id: string;
  public product_id: string;
  public initial_quantity: number;
  public final_quantity?: number;
  public suggestion_quantity?: number;
  public local_price?: number;
}
