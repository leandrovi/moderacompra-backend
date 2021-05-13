import { ProductQuantityEntity } from "./ProductQuantityEntity";
import { StatusEntity } from "./StatusEntity";

export class ListEntity {
  public id?: string;
  public user_id?: string;
  public id_status?: number;
  public status?: StatusEntity;
  public productQuantities?: ProductQuantityEntity[];
}
