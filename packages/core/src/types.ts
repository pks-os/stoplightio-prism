/**
 * The below few interfaces (until end comment) should be defined in the @stoplight/types repo
 */

export interface IDisposable {
  dispose: () => void;
}

export type Path = Array<string | number>;

export enum ValidationSeverity {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
}
export interface IValidation {
  path: Path;
  name: string;
  summary: string;
  severity: ValidationSeverity;
  message: string;
}

// END

export interface IPrism<Resource, Input, Output, Config, LoadOpts> {
  readonly resources: Resource[];
  load: (opts?: LoadOpts) => Promise<void>;
  process: (input: Input, config?: Config) => Promise<IPrismOutput<Input, Output>>;
}

export interface IPrismConfig {
  mock?: boolean | object;
  security?: boolean | object;
  validate?: boolean | object;
}

export type PrismConfigFactory<C, I> = (input: I, defaultConfig?: PrismConfig<C, I>) => Promise<C>;
export type PrismConfig<C, I> = C | PrismConfigFactory<C, I>;

export interface ILoader<Options, Resource> {
  load: (opts?: Options, defaultLoader?: ILoader<Options, Resource>) => Promise<Resource[]>;
}

export interface IFilesystemLoaderOpts {
  path: string;
}

export interface IRouter<Resource, Input, Config> {
  route: (
    opts: { resources: Resource[]; input: Input; config?: Config },
    defaultRouter?: IRouter<Resource, Input, Config>
  ) => Promise<Resource>;
}

export interface IForwarder<Resource, Input, Config, Output> {
  forward: (
    opts: { resource?: Resource; input: IPrismInput<Input>; config?: Config },
    defaultForwarder?: IForwarder<Resource, Input, Config, Output>
  ) => Promise<Output>;
}

export interface IMocker<Resource, Input, Config, Output> {
  mock: (
    opts: { resource?: Resource; input: IPrismInput<Input>; config?: Config },
    defaultMocker?: IMocker<Resource, Input, Config, Output>
  ) => Promise<Output>;
}

export interface IValidator<Resource, Input, Config, Output> {
  validateInput?: (
    opts: { resource: Resource; input: Input; config?: Config },
    defaultValidator?: IValidator<Resource, Input, Config, Output>
  ) => Promise<IValidation[]>;
  validateOutput?: (
    opts: { resource: Resource; output?: Output; config?: Config },
    defaultValidator?: IValidator<Resource, Input, Config, Output>
  ) => Promise<IValidation[]>;
}

export interface IPrismComponents<Resource, Input, Output, Config, LoadOpts> {
  config: PrismConfig<Config, Input>;
  loader: ILoader<LoadOpts, Resource>;
  router: IRouter<Resource, Input, Config>;
  forwarder: IForwarder<Resource, Input, Config, Output>;
  mocker: IMocker<Resource, Input, Config, Output>;
  validator: IValidator<Resource, Input, Config, Output>;
}

export interface IPrismInput<I> {
  validations: {
    input: IValidation[];
  };
  data: I;
}

export interface IPrismOutput<I, O> {
  input: I;
  output?: O;
  validations: {
    input: IValidation[];
    output: IValidation[];
  };
}
