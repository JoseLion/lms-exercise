import { Observable, map } from "rxjs";
import { axios } from "rxjs-axios";

export interface Course {
  duration: number;
  id: string;
  name: string;
}

export type CourseBody = Omit<Course, "id">;

const PATH = "/api/course";

export namespace CourseService {

  export function getAll(): Observable<Course[]> {
    return axios.get<Course[]>(PATH)
      .pipe(map(({ data }) => data));
  }

  export function save(body: CourseBody): Observable<string> {
    return axios.post<string>(PATH, body)
      .pipe(map(({ data }) => data));
  }
}
