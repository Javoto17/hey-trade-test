export interface ClientRepository {
  get<T>(url: string, options?: RequestInit): Promise<T>;
  post<T>(url: string, data: any, options?: RequestInit): Promise<T>;
}
