export interface StorageRepository {
  get: <T>(name: string) => Promise<T | null>;
  set: (name: string, value: unknown) => void;
  delete: (name: string) => void;
}
