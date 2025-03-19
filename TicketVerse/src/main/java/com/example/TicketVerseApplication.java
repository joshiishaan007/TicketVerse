package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class TicketVerseApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketVerseApplication.class, args);
	}

//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				//hello
//				registry.addMapping("/**")
//						.allowedOrigins("http://localhost:5175")
//						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//						.allowedHeaders("*") // Allow all headers
//						.allowCredentials(true)
//						.maxAge(3600);
//				;
//
//			}
//		};
//	}
}
