import { BaseRepository } from "../base/BaseRepository";

import { StatusEntity } from "../../entities";
import Status from "../../database/postgres/models/Status";

export default class StatusRepository extends BaseRepository<StatusEntity> {
  constructor() {
    super(Status);
  }
}
