package io.github.joselion.lmsserver.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import io.github.joselion.lmsserver.LmsServerApplication;

@Configuration
@EnableJpaRepositories(basePackageClasses = LmsServerApplication.class)
public class PersitenceConfig {

}
