package io.github.joselion.lmsserver.config.security;

import static org.springframework.web.cors.CorsConfiguration.ALL;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private static final String SESSION_HEADER = "Session";

  private final AuthManager authManager;

  @Bean
  public SecurityFilterChain securityFilterChain(final HttpSecurity http) throws Exception {
    return http
      .authorizeHttpRequests(request ->
        request
          .requestMatchers("/public/**").permitAll()
          .requestMatchers(HttpMethod.POST, "/api/student/register").permitAll()
          .requestMatchers(HttpMethod.OPTIONS).permitAll()
          .anyRequest().authenticated()
      )
      .cors(cors -> cors.configurationSource(corsConfigSource()))
      .csrf(CsrfConfigurer::disable)
      .httpBasic(HttpBasicConfigurer::disable)
      .formLogin(FormLoginConfigurer::disable)
      .addFilterAt(authenticationFilter(), BasicAuthenticationFilter.class)
      .addFilterAt(logoutFilter(), LogoutFilter.class)
      .build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(10);
  }

  private CorsConfigurationSource corsConfigSource() {
    final var corsConfig = new CorsConfiguration();
    corsConfig.applyPermitDefaultValues();
    corsConfig.addExposedHeader(SESSION_HEADER);
    corsConfig.setAllowedOrigins(List.of("http://localhost:8080"));
    corsConfig.setAllowedMethods(List.of(ALL));

    final var corsSource = new UrlBasedCorsConfigurationSource();
    corsSource.registerCorsConfiguration("/**", corsConfig);

    return corsSource;
  }

  private AuthenticationFilter authenticationFilter() {
    final var filter = new AuthenticationFilter(authManager, new AuthConverter());
    filter.setRequestMatcher(AntPathRequestMatcher.antMatcher(HttpMethod.POST, "/api/login"));
    filter.setSecurityContextRepository(new HttpSessionSecurityContextRepository());
    filter.setFailureHandler((req, res, ex) -> {
      res.setStatus(HttpStatus.UNAUTHORIZED.value());
      res.getWriter().write(ex.getMessage());
      res.flushBuffer();
    });
    filter.setSuccessHandler((req, res, auth) -> {
      final var session = req.getSession();

      res.addHeader(SESSION_HEADER, session.getId());
      res.setStatus(HttpStatus.NO_CONTENT.value());
      res.flushBuffer();
    });

    return filter;
  }

  private LogoutFilter logoutFilter() {
    final var filter = new LogoutFilter(
      (req, res, auth) -> {
        req.getSession().invalidate();
        res.setStatus(HttpStatus.OK.value());
        res.flushBuffer();
      },
      new SecurityContextLogoutHandler()
    );
    filter.setLogoutRequestMatcher(AntPathRequestMatcher.antMatcher(HttpMethod.POST, "/api/logout"));

    return filter;
  }
}
