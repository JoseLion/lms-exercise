package io.github.joselion.lmsserver.config.security;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Optional;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationConverter;

import jakarta.servlet.http.HttpServletRequest;

public record AuthConverter() implements AuthenticationConverter {

  protected static final String AUTH_HEADER = "Authentication";

  protected static final String BEARER = "Bearer";

  @Override
  public Authentication convert(final HttpServletRequest request) {
    return Optional.of(AUTH_HEADER)
      .map(request::getHeader)
      .filter(header -> header.startsWith(BEARER))
      .filter(header -> header.length() > BEARER.length())
      .map(header -> header.substring(BEARER.length() + 1))
      .map(Base64.getDecoder()::decode)
      .map(bytes -> new String(bytes, StandardCharsets.UTF_8))
      .map(decoded -> decoded.split(":"))
      .filter(segments -> segments.length == 2)
      .filter(segments -> !segments[0].isEmpty() && !segments[1].isEmpty())
      .map(segments -> new UsernamePasswordAuthenticationToken(segments[0], segments[1]))
      .orElseThrow(() -> new BadCredentialsException("Invalid authentcation request"));
  }
}
