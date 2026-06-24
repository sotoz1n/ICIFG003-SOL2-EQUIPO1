# Usamos una imagen liviana de Java 17 para correr la app
FROM eclipse-temurin:17-jre-alpine

# Definimos el directorio de trabajo adentro del contenedor
WORKDIR /app

# Copiamos el archivo JAR que generamos con Maven al contenedor
COPY target/*.jar app.jar

# Exponemos el puerto del backend
EXPOSE 8080

# Comando para arrancar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]