package com.equipo1.petshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.Properties;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(BackendApplication.class);
		
		// Forzamos las propiedades de MySQL directo en la memoria del arranque
		Properties properties = new Properties();
		properties.setProperty("spring.datasource.url", "jdbc:mysql://localhost:3306/petshop_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC");
		properties.setProperty("spring.datasource.username", "root");
		properties.setProperty("spring.datasource.password", "1234");
		properties.setProperty("spring.datasource.driver-class-name", "com.mysql.cj.jdbc.Driver");
		
		// Configuración automática de Hibernate (REQ7)
		properties.setProperty("spring.jpa.hibernate.ddl-auto", "update");
		properties.setProperty("spring.jpa.show-sql", "true");
		properties.setProperty("spring.jpa.properties.hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
		
		// Activación automática estándar de data.sql (REQ5)
		properties.setProperty("spring.sql.init.mode", "always");
		properties.setProperty("spring.jpa.defer-datasource-initialization", "true");
		
		application.setDefaultProperties(properties);
		application.run(args);
	}
}