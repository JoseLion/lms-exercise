package io.github.joselion.lmsserver.config;

import static org.springframework.web.servlet.function.RouterFunctions.route;
import static org.springframework.web.servlet.function.ServerResponse.ok;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import io.github.joselion.lmsserver.handlers.account.AccountHandler;
import io.github.joselion.lmsserver.handlers.course.CourseHandler;
import io.github.joselion.lmsserver.handlers.student.StudentHandler;

@Configuration
public class Routes {

  @Bean
  public RouterFunction<ServerResponse> apiRoutes(
    final AccountHandler accountHandler,
    final CourseHandler courseHandler,
    final StudentHandler studentHandler
  ) {
    return route()
      .path("/api", () ->
        route()
          .path("/account", () ->
            route()
              .GET("/current", accountHandler::current)
              .build()
          )
          .path("/course", () ->
            route()
              .GET("", courseHandler::getAll)
              .POST("", courseHandler::save)
              .build()
          )
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
