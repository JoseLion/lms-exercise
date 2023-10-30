package io.github.joselion.lmsserver.config.security;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public record AuthManager(
  JPAUserDetails userDetails,
  @Lazy PasswordEncoder passwordEncoder
) implements AuthenticationManager {

  @Override
  public Authentication authenticate(final Authentication authentication) throws AuthenticationException {
    if (authentication.isAuthenticated()) {
      return authentication;
    }

    final var contextAuth = SecurityContextHolder.getContext().getAuthentication();

    if (contextAuth != null) {
      return contextAuth;
    }

    final var user = userDetails.loadUserByUsername(authentication.getName());
    final var passwordMatch = passwordEncoder.matches(
      (String) authentication.getCredentials(),
      user.getPassword()
    );

    if (passwordMatch) {
      return new UsernamePasswordAuthenticationToken(user, user.getPassword(), user.getAuthorities());
    }

    throw new BadCredentialsException("Invalid email or password");
  }
}
