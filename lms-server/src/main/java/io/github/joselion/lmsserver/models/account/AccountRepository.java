package io.github.joselion.lmsserver.models.account;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, UUID> {

  Optional<Account> findByEmail(String email);
}
