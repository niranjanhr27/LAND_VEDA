package com.landveda.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Expose directory 'uploads/' relative to the application's runtime location
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}
