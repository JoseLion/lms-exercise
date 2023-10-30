import { Observable, map } from "rxjs";
import { axios } from "rxjs-axios";

export interface StudentBody {
  address: string;
  birthdate: Date;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
}

const PATH = "/api/student";

export namespace StudentService {

  export function register(body: StudentBody): Observable<string> {
    return axios
      .post<string>(`${PATH}/register`, body)
      .pipe(map(({ data }) => data));
  }
}
