package io.github.joselion.lmsserver.config.security;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.github.joselion.lmsserver.models.account.AccountRepository;

@Service
public record JPAUserDetails(
  AccountRepository accountRepo,
  @Lazy PasswordEncoder passwordEncoder
) implements UserDetailsService {

  @Override
  public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
    return accountRepo
      .findByEmail(username)
      .map(account ->
        User
          .builder()
          .accountExpired(false)
          .accountLocked(false)
          .authorities(account.getRole().name())
          .credentialsExpired(false)
          .disabled(false)
          .password(account.getPassword())
          .username(account.getEmail())
          .build()
      )
      .orElseThrow(() -> new UsernameNotFoundException("Invalid email or password"));
  }
}
