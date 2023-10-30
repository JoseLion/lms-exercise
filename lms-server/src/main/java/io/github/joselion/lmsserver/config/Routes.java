package io.github.joselion.lmsserver.config;

import static org.springframework.web.servlet.function.RouterFunctions.route;
import static org.springframework.web.servlet.function.ServerResponse.ok;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import io.github.joselion.lmsserver.handlers.student.StudentHandler;

@Configuration
public class Routes {

  @Bean
  public RouterFunction<ServerResponse> apiRoutes(final StudentHandler studentHandler) {
    return route()
      .path("/api", () ->
        route()
          .path("/student", () ->
            route()
              .POST("/register", studentHandler::save)
              .build()
          )
          .build()
      )
      .build();
  }

  @Bean
  public RouterFunction<ServerResponse> publicRoutes() {
    return route()
      .path("/public", () ->
        route()
          .GET("/status", request -> ok().body("OK"))
          .build()
      )
      .build();
  }
}
