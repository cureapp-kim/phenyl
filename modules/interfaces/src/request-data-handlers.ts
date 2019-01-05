import {
  AuthCredentialsOf,
  AuthEntityNameOf,
  AuthOptionsOf,
  BroadEntityOf,
  CustomCommandNameOf,
  CustomCommandOf,
  CustomQueryNameOf,
  CustomQueryOf,
  EntityNameOf,
  GeneralTypeMap
} from "./type-map";
import {
  CustomCommand,
  DeleteCommand,
  IdUpdateCommand,
  LoginCommand,
  LogoutCommand,
  MultiInsertCommand,
  MultiUpdateCommand,
  PushCommand,
  SingleInsertCommand
} from "./command";
import { CustomQuery, IdQuery, IdsQuery, PullQuery, WhereQuery } from "./query";

import { PreEntity } from "./entity";
import { RequestData } from "./request-data";

export type RequestDataHandlers<TM extends GeneralTypeMap, T> = {
  handleDefault(reqData: RequestData): Promise<T>;
} & Partial<{
  find<EN extends EntityNameOf<TM>>(query: WhereQuery<EN>): Promise<T>;

  findOne<EN extends EntityNameOf<TM>>(query: WhereQuery<EN>): Promise<T>;

  get<EN extends EntityNameOf<TM>>(query: IdQuery<EN>): Promise<T>;

  getByIds<EN extends EntityNameOf<TM>>(query: IdsQuery<EN>): Promise<T>;

  pull<EN extends EntityNameOf<TM>>(query: PullQuery<EN>): Promise<T>;

  insertOne<EN extends EntityNameOf<TM>>(
    command: SingleInsertCommand<EN, PreEntity<BroadEntityOf<TM, EN>>>
  ): Promise<T>;

  insertMulti<EN extends EntityNameOf<TM>>(
    command: MultiInsertCommand<EN, PreEntity<BroadEntityOf<TM, EN>>>
  ): Promise<T>;

  insertAndGet<EN extends EntityNameOf<TM>>(
    command: SingleInsertCommand<EN, PreEntity<BroadEntityOf<TM, EN>>>
  ): Promise<T>;

  insertAndGetMulti<EN extends EntityNameOf<TM>>(
    command: MultiInsertCommand<EN, PreEntity<BroadEntityOf<TM, EN>>>
  ): Promise<T>;

  updateById<EN extends EntityNameOf<TM>>(
    command: IdUpdateCommand<EN>
  ): Promise<T>;

  updateMulti<EN extends EntityNameOf<TM>>(
    command: MultiUpdateCommand<EN>
  ): Promise<T>;

  updateAndGet<EN extends EntityNameOf<TM>>(
    command: IdUpdateCommand<EN>
  ): Promise<T>;

  updateAndFetch<EN extends EntityNameOf<TM>>(
    command: MultiUpdateCommand<EN>
  ): Promise<T>;

  push<N extends EntityNameOf<TM>>(command: PushCommand<N>): Promise<T>;

  delete<N extends EntityNameOf<TM>>(command: DeleteCommand<N>): Promise<T>;

  runCustomQuery<QN extends CustomQueryNameOf<TM>>(
    query: CustomQuery<QN, CustomQueryOf<TM, QN>>
  ): Promise<T>;

  runCustomCommand<CN extends CustomCommandNameOf<TM>>(
    command: CustomCommand<CN, CustomCommandOf<TM, CN>>
  ): Promise<T>;

  login<EN extends AuthEntityNameOf<TM>>(
    command: LoginCommand<EN, AuthCredentialsOf<TM, EN>, AuthOptionsOf<TM, EN>>
  ): Promise<T>;

  logout<EN extends AuthEntityNameOf<TM>>(
    command: LogoutCommand<EN>
  ): Promise<T>;

  notMatch(reqData: RequestData): Promise<T>;
}>;