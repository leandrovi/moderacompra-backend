import { ProductEntity } from "./ProductEntity";
import { UnityEntity } from "./UnityEntity";

export class ProductQuantityEntity {
  public id?: string;
  public list_id: string;
  public product_id: string;
  public product?: ProductEntity;
  public initial_quantity: number;
  public final_quantity: number;
  public suggestion_quantity: number;
  public id_unity?: string;
  public unity?: UnityEntity;
}
