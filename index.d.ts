import * as request from "request";

export declare function createBuilder(transport?: Transport): HttpTransportBuilder;
export declare function createClient(): HttpTransportClient;

declare type callbackFunction<T> = (err: any, value?: T) => void
export declare type Plugin = (ctx: Context, next: Plugin) => any;
export declare type Header = Object;
export declare type Querystring = Object;
export declare type Body = string;
export declare type RequestOptions = Object;
export declare type ErrorObject = {
  message: string
}

export declare type JsonResponse = {
  body: string
  elapsedTime: number
  url: string
  headers: Object
  statusCode: number
}

declare type RetryAttempt = {
  reason: string,
  statusCode: number
}

declare type contextDefaults = {
  userAgent?: string
  retries?: number
  retryDelay?: number
}

declare type ToJsonOpts = {
  throwOnConflict?: boolean,
  force?: boolean
}

declare enum Method {
  get,
  set,
  put,
  patch,
  delete,
  head,
  options
}

export declare function toJson(opts: ToJsonOpts): Plugin
export declare function logger(logger?: any): Plugin
export declare function setContextProperty(opts: any, path: string): Plugin

export declare class Request {
  addQuery(key: string, value: string): Request
  addHeader(key: string, value: string): Request
  body(content: string): Request
  method(method: Method): Request
  baseUrl(baseUrl: string): Request
  timeout(timeout: number): Request
  getMethod(): Method
  getTimeout(): number
  getUrl(): string
  getRequestKey(): string
  getHeaders(): Object
  getQueries(): Object
  hasQueries(): boolean
  hasBaseQueries(): boolean
  hasHeaders(): boolean
  getBody(): string
  create(): Request
}

export declare class Response {
  headers: Header[]
  elapsedTime: number
  url: string
  statusCode: number
  body: Body
  httpResponse?: request.Response
  readonly length: number
  static create(opts?: JsonResponse): Response
  addHeader(key: string, value: string): Request
  getHeader(key: string): string
  toJson(): JsonResponse
}

export declare class HttpTransportBuilder {
  userAgent(userAgent: string): HttpTransportBuilder
  retries(retries: number): HttpTransportBuilder
  retryDelay(retryDelay: number): HttpTransportBuilder
  use(fn: Plugin): HttpTransportBuilder
  asCallback(): HttpTransportBuilder
  createClient(): HttpTransportClient
}

export declare class HttpTransportClient {
  use(fn: Plugin): HttpTransportClient
  get(baseUrl: string): HttpTransportClient
  post(baseUrl: string, body: string | object): HttpTransportClient
  patch(baseUrl: string, body: string | object): HttpTransportClient
  put(baseUrl: string, body: string | object): HttpTransportClient
  delete(baseUrl: string): HttpTransportClient
  head(baseUrl: string): HttpTransportClient
  headers(headers: Header): HttpTransportClient
  query(query: Querystring): HttpTransportClient
  timeout(timeout: number): HttpTransportClient
  retries(retries: number): HttpTransportClient
  retryDelay(retryDelay: number): HttpTransportClient
  asBody(): Promise<Body>
  asResponse(): Promise<Response>
}

declare class Context {
  plugins: Plugin[]
  req: Request
  res: Response

  static create(defaults: contextDefaults)
  retryAttempts: Array<RetryAttempt>
  addPlugin(plugin: Plugin): Context
}

export declare class defaultTransport extends RequestTransport {
  constructor(params: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>)
}
export declare class RequestTransport extends Transport {
  constructor(params: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>)
}

export declare class Transport {
  toError(err: ErrorObject, ctx: Context): Error
  createError(err: ErrorObject, ctx: Context): Error
  execute(ctx: Context): Promise<RequestTransport>
  onError(ctx: Context): Function
  toOptions(ctx: Context): RequestOptions
  toResponse(ctx: Context, from: request.Response): Response
  makeRequest(ctx: Context, opts: RequestOptions): Promise<Response>
}

export declare var builder: HttpTransportBuilder;
export declare var transport: Transport;
export declare var context: Context;
