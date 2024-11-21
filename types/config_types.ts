export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface EndpointFromConfig {
  path: string;
  httpMethods: HttpMethod[];
  hasManyRecords: boolean;
  // description: string;
  authenticationRequired?: boolean;
}

export interface YAMLConfig {
  endpoints: EndpointFromConfig[];
  corsAllowlist: string[];
}
