package io.github.joselion.lmsserver.handlers.student;

import static java.util.stream.Collectors.joining;

import java.time.LocalDate;
import java.util.UUID;

import org.eclipse.jdt.annotation.Nullable;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpServerErrorException;

import am.ik.yavi.builder.ValidatorBuilder;
import am.ik.yavi.core.ConstraintViolation;

public record StudentBody(
  @Nullable UUID id,
  String email,
  String password,
  String firstName,
  String lastName,
  LocalDate birthdate,
  String address,
  String phoneNumber
) {

  public void validate() {
    final var validator = ValidatorBuilder.of(StudentBody.class)
      .constraint(StudentBody::email, "email", c -> c.notNull().email())
      .constraint(StudentBody::password, "password", c -> c.notNull().notBlank())
      .constraint(StudentBody::firstName, "firstName", c -> c.notNull().notBlank())
      .constraint(StudentBody::lastName, "lastName", c -> c.notNull().notBlank())
      .constraint(StudentBody::birthdate, "birthdate", c -> c.notNull().beforeOrEqual(this::ageRestriction))
      .constraint(StudentBody::address, "address", c -> c.notNull().notBlank())
      .constraint(StudentBody::phoneNumber, "phoneNumber", c -> c.notNull().notBlank())
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

  private LocalDate ageRestriction() {
    return LocalDate
      .now()
      .minusYears(16);
  }
}
