type Nullable<T> = T | null;

declare interface JSON {
  parse<T>(text: string, reviver?: (this: unknown, key: string, value: unknown) => T): T;
}
