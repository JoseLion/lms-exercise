import { Button, H2, HTMLTable, Spinner } from "@blueprintjs/core";
import { Form } from "@lynxts/web";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { finalize } from "rxjs";
import { ObjectSchema, number, object, string } from "yup";

import { Course, CourseBody, CourseService } from "../../services/course.service";
import { NumericField } from "../common/fields/Numeric.field";
import { TextField } from "../common/fields/Text.field";

const schema: ObjectSchema<CourseBody> = object({
  duration: number().min(1).max(180).required(),
  name: string().required(),
});

export function CoursesScreen(): ReactElement {

  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  const createCourse = useCallback((values: CourseBody): void => {
    setPending(true);

    CourseService.save(values)
      .pipe(finalize(() => setPending(true)))
      .subscribe(id => {
        setCourses(prev => [
          ...prev,
          { ...values, id },
        ]);
      });
  }, []);

  useEffect(() => {
    setLoading(true);

    const subscription = CourseService.getAll()
      .pipe(finalize(() => setLoading(false)))
      .subscribe(setCourses);

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <H2>{"Courses Management"}</H2>

      <div>
        <Form onSubmit={createCourse} validation={schema}>
          <TextField<CourseBody> name="name" label="Name" />
          <NumericField<CourseBody> name="duration" label="Duration (days)" />
          <Button type="submit" loading={pending}>{"Create"}</Button>
        </Form>
      </div>

      <br />

      {loading && <Spinner />}

      {!loading && (
        <HTMLTable width="50%" bordered={true} compact={true}>
          <thead>
            <th>{"Name"}</th>
            <th>{"Duration"}</th>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>{`${course.duration} days`}</td>
              </tr>
            ))}
          </tbody>
        </HTMLTable>
      )}
    </>
  );
}
