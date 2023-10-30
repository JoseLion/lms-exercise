package io.github.joselion.lmsserver.models.student;

import java.time.LocalDate;
import java.util.UUID;

import io.github.joselion.lmsserver.models.account.Account;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.With;

@With
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Student {

  @Id
  private UUID id;

  @JoinColumn(nullable = false)
  @OneToOne(cascade = CascadeType.ALL, optional = false)
  private Account account;

  private String firstName;

  private String lastName;

  private LocalDate birthdate;

  private String address;

  private String phoneNumber;

  public static Student empty() {
    return new Student(
      UUID.randomUUID(),
      Account.empty(),
      "",
      "",
      LocalDate.MIN,
      "",
      ""
    );
  }
}
