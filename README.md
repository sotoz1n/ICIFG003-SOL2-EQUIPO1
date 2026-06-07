ICIFG003-SOL2-EQUIPO1 - Proyecto Solemne N°2

REQUISTOS
--------------------------------------------------------
- Java 17+
- Node.js & Angular CLI
- PostgreSQL

BACKEND (SPRING BOOT)
---------------------------------------------------------
- Moverse a la carpeta:           cd backend
- Comando para correr el backend:  .\mvnw clean spring-boot:run
- o Usar el botón de "Run" en BackendApplication.java en VS Code)*
- Extensiones Visual: Extension Pack for Java | Spring Boot Extension Pack | Prettier - Code formatter (para mantener orden en codigo)
- URL del backend local:          http://localhost:8080/api/...

FRONTEND (ANGULAR)
---------------------------------------------------------
- Moverse a la carpeta correcta:  cd frontend\petshop-front
- Instalar dependencias (suave):  npm install
- Limpiar caché (si hay error):   npm cache clean --force
- Instalar a la fuerza (purga):   npm install --force
- Correr y abrir en navegador:    ng serve -o
- Extensiones Visual: Angular Lenguaje Service
- URL del frontend local:         http://localhost:4200


BASE DE DATOS (POSTGRESQL / SQL SHELL / CMD)
---------------------------------------------------------
- Entrar a la consola:            Abrir "SQL Shell (psql) / CMD" en Windows y presionar Enter a todo (clave: 1234)
- Crear la base de datos:         CREATE DATABASE petshop_db;
- Ver lista de bases de datos:    \l
- Conectarse a la BD petshop:     \c petshop_db
- Ver las tablas creadas:         \dt
- Ej: Consultar datos de clientes:    SELECT * FROM cliente;
