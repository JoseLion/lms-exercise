package io.github.joselion.lmsserver.handlers.course;

import static org.springframework.web.servlet.function.ServerResponse.ok;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import io.github.joselion.lmsserver.models.course.Course;
import io.github.joselion.lmsserver.models.course.CourseRepository;
import jakarta.servlet.ServletException;

@Service
public record CourseHandler(CourseRepository courseRepo) {

  public ServerResponse getAll(final ServerRequest request) {
    final var courses = courseRepo.findAll();

    return ok().body(courses);
  }

  public ServerResponse save(final ServerRequest request) throws ServletException, IOException {
    final var body = request.body(CourseBody.class);
    final var found = courseRepo.findByName(body.name());

    if (found.isPresent()) {
      return ServerResponse
        .unprocessableEntity()
        .body("A course named \"%s\" already exists".formatted(body.name()));
    }

    final var course = Course
      .empty()
      .withName(body.name())
      .withDuration(body.duration());
    final var saved = courseRepo.save(course);

    return ok().body(saved.getId());
  }
}
