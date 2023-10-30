import { Observable, map } from "rxjs";
import { axios } from "rxjs-axios";

const PATH = "/api/student";

export namespace StudentService {

  export function register(body: unknown): Observable<string> {
    return axios
      .post<string>(`${PATH}/register`, body)
      .pipe(map(({ data }) => data));
  }
}
