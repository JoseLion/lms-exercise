import { Observable, filter, map, throwIfEmpty } from "rxjs";
import { RawAxiosRequestHeaders, axios } from "rxjs-axios";

import { Account } from "../store/Auth.context";

import { Buffer } from "buffer";

export interface LoginBody {
  email: string;
  password: string;
}

const PATH = "/api";

export namespace AuthService {

  export function login({ email, password }: LoginBody): Observable<string> {
    const credentials = Buffer.from(`${email}:${password}`).toString("base64");
    const authHeader = `Bearer ${credentials}`;
    const headers: RawAxiosRequestHeaders = { Authentication: authHeader };

    return axios.post<void>(
      `${PATH}/login`,
      undefined,
      { headers },
    )
    .pipe(
      map(res => String(res.headers.session)),
      filter(Boolean),
      throwIfEmpty(() => Error("Invalid session!")),
    );
  }

  export function current(): Observable<Account> {
    return axios
      .get<Account>(`${PATH}/account/current`)
      .pipe(map(({ data }) => data));
  }
}
