import {
  AuthCommandMapOf,
  AuthCredentials,
  AuthOptions,
  BroadEntityMapOf,
  CustomCommandMapOf,
  CustomCommandParams,
  CustomCommandResultValue,
  CustomQueryMapOf,
  CustomQueryParams,
  CustomQueryResultValue,
  GeneralAuthCommandMap,
  GeneralCustomMap,
  GeneralEntityMap,
  GeneralTypeMap,
  NarrowAuthUser,
  NarrowEntity
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
import {
  CustomCommandResult,
  DeleteCommandResult,
  GetCommandResult,
  IdUpdateCommandResult,
  LoginCommandResult,
  LogoutCommandResult,
  MultiInsertCommandResult,
  MultiUpdateCommandResult,
  MultiValuesCommandResult,
  PushCommandResult,
  SingleInsertCommandResult
} from "./command-result";
import { CustomQuery, IdQuery, IdsQuery, PullQuery, WhereQuery } from "./query";
import {
  CustomQueryResult,
  PullQueryResult,
  QueryResult,
  SingleQueryResult
} from "./query-result";

import { Key } from "./key";
import { KvsClient } from "./kvs-client";
import { PreEntity } from "./entity";
import { RestApiHandler } from "./rest-api-handler";
import { Session } from "./session";

export interface EntityClient<M extends GeneralEntityMap> {
  find<EN extends Key<M>>(
    query: WhereQuery<EN>,
    sessionId?: string | null
  ): Promise<QueryResult<NarrowEntity<M, EN>>>;

  findOne<EN extends Key<M>>(
    query: WhereQuery<EN>,
    sessionId?: string | null
  ): Promise<SingleQueryResult<NarrowEntity<M, EN>>>;

  get<EN extends Key<M>>(
    query: IdQuery<EN>,
    sessionId?: string | null
  ): Promise<SingleQueryResult<NarrowEntity<M, EN>>>;

  getByIds<EN extends Key<M>>(
    query: IdsQuery<EN>,
    sessionId?: string | null
  ): Promise<QueryResult<NarrowEntity<M, EN>>>;

  pull<EN extends Key<M>>(
    query: PullQuery<EN>,
    sessionId?: string | null
  ): Promise<PullQueryResult<NarrowEntity<M, EN>>>;

  insertOne<EN extends Key<M>>(
    command: SingleInsertCommand<EN, PreEntity<NarrowEntity<M, EN>>>,
    sessionId?: string | null
  ): Promise<SingleInsertCommandResult>;

  insertMulti<EN extends Key<M>>(
    command: MultiInsertCommand<EN, PreEntity<NarrowEntity<M, EN>>>,
    sessionId?: string | null
  ): Promise<MultiInsertCommandResult>;

  insertAndGet<EN extends Key<M>>(
    command: SingleInsertCommand<EN, PreEntity<NarrowEntity<M, EN>>>,
    sessionId?: string | null
  ): Promise<GetCommandResult<NarrowEntity<M, EN>>>;

  insertAndGetMulti<EN extends Key<M>>(
    command: MultiInsertCommand<EN, PreEntity<NarrowEntity<M, EN>>>,
    sessionId?: string | null
  ): Promise<MultiValuesCommandResult<NarrowEntity<M, EN>>>;

  updateById<EN extends Key<M>>(
    command: IdUpdateCommand<EN>,
    sessionId?: string | null
  ): Promise<IdUpdateCommandResult>;

  updateMulti<EN extends Key<M>>(
    command: MultiUpdateCommand<EN>,
    sessionId?: string | null
  ): Promise<MultiUpdateCommandResult>;

  updateAndGet<EN extends Key<M>>(
    command: IdUpdateCommand<EN>,
    sessionId?: string | null
  ): Promise<GetCommandResult<NarrowEntity<M, EN>>>;

  updateAndFetch<EN extends Key<M>>(
    command: MultiUpdateCommand<EN>,
    sessionId?: string | null
  ): Promise<MultiValuesCommandResult<NarrowEntity<M, EN>>>;

  push<EN extends Key<M>>(
    command: PushCommand<EN>,
    sessionId?: string | null
  ): Promise<PushCommandResult<NarrowEntity<M, EN>>>;

  delete<EN extends Key<M>>(
    command: DeleteCommand<EN>,
    sessionId?: string | null
  ): Promise<DeleteCommandResult>;

  createSessionClient(): SessionClient;
}

export interface CustomClient<
  QM extends GeneralCustomMap,
  CM extends GeneralCustomMap
> {
  runCustomQuery<QN extends Key<QM>>(
    query: CustomQuery<QN, CustomQueryParams<QM, QN>>,
    sessionId?: string | null
  ): Promise<CustomQueryResult<CustomQueryResultValue<QM, QN>>>;

  runCustomCommand<CN extends Key<CM>>(
    command: CustomCommand<CN, CustomCommandParams<CM, CN>>,
    sessionId?: string | null
  ): Promise<CustomCommandResult<CustomCommandResultValue<CM, CN>>>;
}

export interface AuthClient<
  M extends GeneralEntityMap,
  AM extends GeneralAuthCommandMap
> {
  login<EN extends Key<AM>>(
    command: LoginCommand<EN, AuthCredentials<AM, EN>, AuthOptions<AM, EN>>,
    sessionId?: string | null
  ): Promise<LoginCommandResult<NarrowAuthUser<AM, EN, M>>>;

  logout<EN extends Key<AM>>(
    command: LogoutCommand<EN>,
    sessionId?: string | null
  ): Promise<LogoutCommandResult>;
}

export type RestApiClient<TM extends GeneralTypeMap> = EntityClient<
  BroadEntityMapOf<TM>
> &
  CustomClient<CustomQueryMapOf<TM>, CustomCommandMapOf<TM>> &
  AuthClient<BroadEntityMapOf<TM>, AuthCommandMapOf<TM>> &
  RestApiHandler<TM>;

export type SessionClient = KvsClient<Session>;