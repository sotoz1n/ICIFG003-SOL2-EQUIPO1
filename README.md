# PetShop Online

Equipo 1: Franco Sepúlveda, Benjamín Sepúlveda, Benjamín Soto.

---------------------------------------------------------
REQUISITOS PREVIOS (ENTORNO HOST)
---------------------------------------------------------
Para ejecutar este proyecto de forma integral, tu máquina local solo necesita:
- Git: Para clonar el repositorio y gestionar ramas.
- Docker Desktop: Debe estar instalado y ejecutándose en segundo plano.
- Nota para usuarios de Windows: Asegurarse de tener habilitado WSL2 o en su defecto Hyper-V para el correcto funcionamiento de los contenedores.

---------------------------------------------------------
DESPLIEGUE RÁPIDO (DOCKER COMPOSE)
---------------------------------------------------------
El ecosistema está orquestado mediante docker-compose.yml. Para levantar el proyecto completo desde cero:

1. Clonar la rama de producción/QA:
   git clone -b QA https://github.com/sotoz1n/ICIFG003-SOL2-EQUIPO1.git
   cd (donde este el proyecto)

2. Compilar el Backend (Generar el .jar):
   (Este paso es necesario para que el Dockerfile del backend encuentre el empaquetado)
   cd backend
   ./mvnw clean package -DskipTests
   cd ..

3. Levantar la Infraestructura:
   docker-compose up --build

(Para detener todos los servicios, presiona Ctrl + C en tu terminal o ejecuta docker-compose down).

---------------------------------------------------------
FRONTEND (ANGULAR + NGINX)
---------------------------------------------------------
- Tecnologías: Angular 16+, Node.js (solo para build), Nginx.
- Arquitectura: Implementa un Multi-stage build. Se utiliza Node para compilar el código dinámico, pero la versión de producción se sirve mediante Nginx (imagen nginx:alpine).
- Optimización: Esto reduce el peso de la imagen de >1GB a ~25MB, entregando archivos estáticos de forma ultra eficiente.
- Acceso Local: http://localhost (Puerto 80)

---------------------------------------------------------
BACKEND (SPRING BOOT)
---------------------------------------------------------
- Tecnologías: Java 17, Spring Boot, Maven, Hibernate/JPA.
- Arquitectura: API REST aislada en su propio contenedor. Cuenta con políticas de CORS habilitadas para permitir la comunicación segura con el contenedor del Frontend.
- Resiliencia: Configurado con políticas restart: on-failure y dependencias de red para asegurar que arranque de forma sincronizada con la base de datos.
- Acceso Local: http://localhost:8080/api/...

---------------------------------------------------------
BASE DE DATOS (MYSQL 8.0)
---------------------------------------------------------
- Motor: MySQL 8.0 (Contenerizado).
- Persistencia: Se utilizan Volúmenes de Docker para asegurar que los datos (carritos, detalles de compra y contactos) no se pierdan si el contenedor se reinicia o apaga.
- Puerto expuesto: 3306

Acceso mediante consola interactiva (CMD / Terminal):
Si deseas consultar los datos en tiempo real mientras la aplicación está corriendo:

1. Entrar al contenedor:
   docker exec -it petshop_db_container mysql -u root -p

2. Contraseña: 1234 y presionar Enter.

3. Seleccionar la base de datos:
   USE petshop_db;

4. Comandos útiles de prueba:
   SHOW TABLES;
   SELECT * FROM carrito;
   SELECT * FROM detalle_carrito;
   SELECT * FROM contacto;

---------------------------------------------------------
COMANDOS ÚTILES PARA DESARROLLADORES
---------------------------------------------------------
- Ver logs del Backend en tiempo real (Para monitoreo REQ 9 y 10):
  docker logs -f petshop_backend_container

- Reconstruir un contenedor específico sin botar el resto:
  docker-compose up -d --build backend

- Limpiar el sistema Docker (Caché e imágenes huérfanas):
  docker system prune -a