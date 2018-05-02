package geometry.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("greeting");
        registry.addViewController("/greeting").setViewName("greeting");
        registry.addViewController("/welcome").setViewName("greeting");
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/reg").setViewName("registration");
        registry.addViewController("/constructor").setViewName("constructor");
    }

}
