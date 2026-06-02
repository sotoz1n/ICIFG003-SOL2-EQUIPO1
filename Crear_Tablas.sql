CREATE TABLE categoria_producto (
    id SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL,
    descripcion VARCHAR(200)
);

CREATE TABLE veterinario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    correo VARCHAR(150),
    telefono VARCHAR(20)
);

CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    rut VARCHAR(12) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150),
    telefono VARCHAR(20),
    direccion VARCHAR(200),
    fecha_registro DATE DEFAULT CURRENT_DATE
);

CREATE TABLE servicio (
    id SERIAL PRIMARY KEY,
    nombre_servicio VARCHAR(100) NOT NULL,
    descripcion TEXT,
    valor DECIMAL(10,2) NOT NULL
);

CREATE TABLE producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    imagen VARCHAR(255),
    id_categoria INT NOT NULL,
    CONSTRAINT fk_categoria FOREIGN KEY (id_categoria) REFERENCES categoria_producto(id)
);

CREATE TABLE mascota (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especie VARCHAR(50),
    raza VARCHAR(100),
    sexo CHAR(1),
    fecha_nacimiento DATE,
    peso DECIMAL(5,2),
    id_cliente INT NOT NULL,
    CONSTRAINT fk_cliente FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

CREATE TABLE carrito (
    id SERIAL PRIMARY KEY,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_cliente INT NOT NULL,
    CONSTRAINT fk_carrito_cliente FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

CREATE TABLE detalle_carrito (
    id SERIAL PRIMARY KEY,
    id_carrito INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_detalle_carrito FOREIGN KEY (id_carrito) REFERENCES carrito(id),
    CONSTRAINT fk_detalle_producto FOREIGN KEY (id_producto) REFERENCES producto(id)
);

CREATE TABLE reserva (
    id SERIAL PRIMARY KEY,
    fecha_hora_reserva TIMESTAMP NOT NULL,
    estado VARCHAR(30) NOT NULL,
    observacion TEXT,
    id_mascota INT NOT NULL,
    id_veterinario INT NOT NULL,
    id_servicio INT NOT NULL,
    CONSTRAINT fk_reserva_mascota FOREIGN KEY (id_mascota) REFERENCES mascota(id),
    CONSTRAINT fk_reserva_vet FOREIGN KEY (id_veterinario) REFERENCES veterinario(id),
    CONSTRAINT fk_reserva_servicio FOREIGN KEY (id_servicio) REFERENCES servicio(id)
);

CREATE TABLE historial_medico (
    id SERIAL PRIMARY KEY,
    fecha_atencion DATE NOT NULL,
    diagnostico TEXT,
    tratamiento TEXT,
    observaciones TEXT,
    id_mascota INT NOT NULL,
    id_veterinario INT NOT NULL,
    CONSTRAINT fk_historial_mascota FOREIGN KEY (id_mascota) REFERENCES mascota(id),
    CONSTRAINT fk_historial_vet FOREIGN KEY (id_veterinario) REFERENCES veterinario(id)
);