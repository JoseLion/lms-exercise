package io.github.joselion.lmsserver;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

import io.github.joselion.testing.annotations.IntegrationTest;

@IntegrationTest class LmsServerApplicationTests {

  @Autowired
  private ApplicationContext appContext;

  @Nested class when_the_application_starts {
    @Test void the_app_context_loads() {
      assertThat(appContext).isNotNull();
    }
  }
}
