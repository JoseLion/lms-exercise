package io.github.joselion.lmsserver.handlers.course;

import static java.util.stream.Collectors.joining;

import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpServerErrorException;

import am.ik.yavi.builder.ValidatorBuilder;
import am.ik.yavi.core.ConstraintViolation;

public record CourseBody(
  String name,
  Integer duration
) {

  public void validate() {
    final var validator = ValidatorBuilder.of(CourseBody.class)
      .constraint(CourseBody::name, "name", c -> c.notNull().notBlank())
      .constraint(CourseBody::duration, "duration", c -> c.notNull().positive().lessThanOrEqual(180))
      .build();
    final var violations = validator.validate(this);

    if (!violations.isEmpty()) {
      throw new HttpServerErrorException(
        HttpStatus.UNPROCESSABLE_ENTITY,
        violations
          .stream()
          .map(ConstraintViolation::message)
          .collect(joining(", "))
      );
    }
  }
}
