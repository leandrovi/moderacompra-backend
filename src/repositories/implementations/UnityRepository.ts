import { BaseRepository } from "../base/BaseRepository";

import { UnityEntity } from "../../entities";
import Unity from "../../database/postgres/models/Unity";

export default class UnityRepository extends BaseRepository<UnityEntity> {
  constructor() {
    super(Unity);
  }
}
