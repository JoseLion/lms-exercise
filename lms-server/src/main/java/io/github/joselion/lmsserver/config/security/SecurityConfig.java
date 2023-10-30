package io.github.joselion.lmsserver.config.security;

import static org.springframework.web.cors.CorsConfiguration.ALL;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

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
      .build();
  }

  private CorsConfigurationSource corsConfigSource() {
    final var corsConfig = new CorsConfiguration();
    corsConfig.applyPermitDefaultValues();
    corsConfig.setAllowedOrigins(List.of("http://localhost:8080"));
    corsConfig.setAllowedMethods(List.of(ALL));

    final var corsSource = new UrlBasedCorsConfigurationSource();
    corsSource.registerCorsConfiguration("/**", corsConfig);

    return corsSource;
  }
}
