import { ClientRepository } from '../domain/ClientRepository';

export const generateClientRepository = (): ClientRepository => {
  return {
    get: (url, options) => get(url, options),
    post: (url, data, options) => post(url, data, options),
  };
};

const DEFAULT_HEADERS = {
  Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
  accept: 'application/json',
};

async function get<T>(url: string, options: RequestInit = {}): Promise<T> {
  const fetchOptions: RequestInit = {
    ...options,
    method: 'GET',
    headers: {
      ...(options.headers || {}),
      ...DEFAULT_HEADERS,
    },
  };

  const response = await fetch(url, fetchOptions);

  if (response.status !== 200) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

async function post<T>(
  url: string,
  data: unknown,
  options: RequestInit = {}
): Promise<T> {
  const fetchOptions: RequestInit = {
    ...options,
    method: 'POST',
    headers: {
      ...(options.headers || {}),
      ...DEFAULT_HEADERS,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
