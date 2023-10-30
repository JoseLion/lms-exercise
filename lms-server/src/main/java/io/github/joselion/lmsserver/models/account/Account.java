package io.github.joselion.lmsserver.models.account;

import java.util.UUID;

import org.eclipse.jdt.annotation.Nullable;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.With;

@With
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Account {

  @Id
  private UUID id;

  private String email;

  @Nullable
  private String password;

  @Enumerated(EnumType.STRING)
  private Role role;

  public static Account empty() {
    return new Account(
      UUID.randomUUID(),
      "",
      null,
      Role.STUDENT
    );
  }
}
