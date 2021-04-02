import { BaseRepository } from "../base/BaseRepository";

import { ListEntity } from "../../entities";
import List from "../../database/postgres/models/List";

export default class ListRepository extends BaseRepository<ListEntity> {
  constructor() {
    super(List);
  }
}
