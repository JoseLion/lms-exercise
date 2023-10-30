package io.github.joselion.lmsserver.handlers.account;

import static org.springframework.web.servlet.function.ServerResponse.notFound;
import static org.springframework.web.servlet.function.ServerResponse.ok;

import java.security.Principal;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import io.github.joselion.lmsserver.models.account.AccountRepository;

@Service
public record AccountHandler(AccountRepository accountRepo) {

  public ServerResponse current(final ServerRequest request) {
    return request
      .principal()
      .map(Principal::getName)
      .flatMap(accountRepo::findByEmail)
      .map(account -> account.withPassword("REDACTED"))
      .map(ok()::body)
      .orElseGet(notFound()::build);
  }
}
