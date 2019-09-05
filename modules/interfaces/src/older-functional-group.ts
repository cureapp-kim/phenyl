import { AuthDefinition, UserDefinition } from "./user-definition";

import { CustomCommandDefinition } from "./custom-command-definition";
import { CustomQueryDefinition } from "./custom-query-definition";
import { EntityRestApiDefinition } from "./entity-definition";

export interface OlderEntityRestApiDefinition {
  authorization?: EntityRestApiDefinition["authorize"];
  normalization?: EntityRestApiDefinition["normalize"];
  validation?: EntityRestApiDefinition["validate"];
  wrapExecution?: EntityRestApiDefinition["wrapExecution"];
}

type OlderEntityRestApiDefinitions = {
  [EntityName: string]: OlderEntityRestApiDefinition | EntityRestApiDefinition;
};

export interface OlderCustomQueryDefinition {
  authorization?: CustomQueryDefinition["authorize"];
  normalization?: CustomQueryDefinition["normalize"];
  validation?: CustomQueryDefinition["validate"];
  execution: CustomQueryDefinition["execute"];
}

type OlderCustomQueryDefinitions = {
  [QueryName: string]: OlderCustomQueryDefinition | CustomQueryDefinition;
};

export interface OlderCustomCommandDefinition {
  authorization?: CustomCommandDefinition["authorize"];
  normalization?: CustomCommandDefinition["normalize"];
  validation?: CustomCommandDefinition["validate"];
  execution: CustomCommandDefinition["execute"];
}

type OlderCustomCommandDefinitions = {
  [CommandName: string]: OlderCustomCommandDefinition | CustomCommandDefinition;
};

export interface OlderUserDefinition extends OlderEntityRestApiDefinition {
  authentication: AuthDefinition["authenticate"];
}

type OlderUserDefinitions = {
  [EntityName: string]: OlderUserDefinition | UserDefinition;
};

export type OlderFunctionalGroup = Partial<{
  users: OlderUserDefinitions;
  nonUsers: OlderEntityRestApiDefinitions;
  customQueries: OlderCustomQueryDefinitions;
  customCommands: OlderCustomCommandDefinitions;
}>;
