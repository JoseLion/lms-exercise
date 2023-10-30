package io.github.joselion.lmsserver.models.course;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

public interface CourseRepository extends CrudRepository<Course, UUID> {

  Optional<Course> findByName(String name);
}
