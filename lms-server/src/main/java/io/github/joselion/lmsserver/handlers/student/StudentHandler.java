package io.github.joselion.lmsserver.handlers.student;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import io.github.joselion.lmsserver.models.account.Account;
import io.github.joselion.lmsserver.models.account.AccountRepository;
import io.github.joselion.lmsserver.models.account.Role;
import io.github.joselion.lmsserver.models.student.Student;
import io.github.joselion.lmsserver.models.student.StudentRepository;
import jakarta.servlet.ServletException;

@Service
public record StudentHandler(
  AccountRepository accountRepo,
  StudentRepository studentRepo
) {

  public ServerResponse save(final ServerRequest request) throws ServletException, IOException {
    final var body = request.body(StudentBody.class);
    body.validate();

    final var found = this.accountRepo.findByEmail(body.email());

    if (found.isPresent()) {
      return ServerResponse
        .unprocessableEntity()
        .body("An account with email \"%s\" already exists".formatted(body.email()));
    }

    final var account = Account
      .empty()
      .withEmail(body.email())
      .withPassword(body.password())
      .withRole(Role.STUDENT);
    final var student = Student
      .empty()
      .withAccount(account)
      .withFirstName(body.firstName())
      .withLastName(body.lastName())
      .withBirthdate(body.birthdate())
      .withAddress(body.address())
      .withPhoneNumber(body.phoneNumber());
    final var saved = this.studentRepo.save(student);

    return ServerResponse.ok().body(saved.id());
  }
}
