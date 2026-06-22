-- Inserción de Clientes iniciales adaptado a tus columnas reales (REQ5)
INSERT INTO cliente (id, rut, nombre, apellido, correo, direccion, telefono, fecha_registro) 
SELECT 1, '12345678-9', 'Juan', 'Pérez', 'juan.perez@email.com', 'Av. Collao 1200, Concepción', '+56912345678', '2026-06-16'
WHERE NOT EXISTS (SELECT 1 FROM cliente WHERE id = 1);

INSERT INTO cliente (id, rut, nombre, apellido, correo, direccion, telefono, fecha_registro) 
SELECT 2, '98765432-1', 'María', 'Flores', 'maria.flores@email.com', 'Calle Los Carreras 450, Concepción', '+56987654321', '2026-06-16'
WHERE NOT EXISTS (SELECT 1 FROM cliente WHERE id = 2);


-- Inserción previa de Categorías obligatoria para evitar fallos de llave foránea en productos
INSERT INTO categoria_producto (id, nombre_categoria, descripcion)
SELECT 1, 'Perros', 'Comida para perros, juguetes y accesorios para perros'
WHERE NOT EXISTS (SELECT 1 FROM categoria_producto WHERE id = 1);

INSERT INTO categoria_producto (id, nombre_categoria, descripcion)
SELECT 2, 'Accesorios', 'Juguetes, collares, correas y camas'
WHERE NOT EXISTS (SELECT 1 FROM categoria_producto WHERE id = 2);

INSERT INTO categoria_producto (id, nombre_categoria, descripcion)
SELECT 3, 'Gatos', 'Juguetes, alimento y accesorios para gatos'
WHERE NOT EXISTS (SELECT 1 FROM categoria_producto WHERE id = 3);

--CATEGORIA 1: PERRO, 2: ACCESORIOS, 3: GATO
-- Inserción de Productos iniciales adaptado a tus columnas reales
INSERT INTO producto (id, nombre, descripcion, precio, stock, imagen, id_categoria) 
SELECT 1, 'Alimento Perro Adulto 15kg', 'Nutrición completa para mascotas adultas', 25990, 50, 'https://unimarc.vtexassets.com/arquivos/ids/244816/000000000000231126-UN-01.jpg?v=638652959508770000', 1
WHERE NOT EXISTS (SELECT 1 FROM producto WHERE id = 1);

INSERT INTO producto (id, nombre, descripcion, precio, stock, imagen, id_categoria) 
SELECT 2, 'Collar Ajustable Reflectante', 'Collar de alta visibilidad nocturna para paseos', 7990, 30, 'https://ae01.alicdn.com/kf/S191f195dad3a49a09ea2493654554625d.jpg?has_lang=1&ver=2', 2
WHERE NOT EXISTS (SELECT 1 FROM producto WHERE id = 2);

INSERT INTO producto (id, nombre, descripcion, precio, stock, imagen, id_categoria) 
SELECT 3, 'Casa Para Perro', 'Casa cómoda y segura para tu mascota', 69990, 10, 'https://easycl.vteximg.com.br/arquivos/ids/4869600/1389960-0000-001.jpg?v=638863619620530000', 1
WHERE NOT EXISTS (SELECT 1 FROM producto WHERE id = 3);

INSERT INTO producto (id, nombre, descripcion, precio, stock, imagen, id_categoria) 
SELECT 4, 'Juguete Raton', 'Juguete interactivo para gatos', 4990, 60, 'https://arenaparamascotas.cl/wp-content/uploads/2024/09/Juguete-Raton-con-sonido-para-gatos-2.jpg', 3
WHERE NOT EXISTS (SELECT 1 FROM producto WHERE id = 4);

INSERT INTO producto (id, nombre, descripcion, precio, stock, imagen, id_categoria) 
SELECT 5, 'Arenero de Gato', 'Arenero espacioso para gatos', 32990, 100, 'https://cl-cenco-pim-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/prd-cl/product-medias/3ddd90c2-cb63-4397-a5d0-6e19ba3f0d4b/MKJEOA9OV5/MKJEOA9OV5-1/1763662113336-MKJEOA9OV5-1-1.jpg', 3
WHERE NOT EXISTS (SELECT 1 FROM producto WHERE id = 5);

INSERT INTO producto (id, nombre, descripcion, precio, stock, imagen, id_categoria) 
SELECT 6, 'Peine para Mascotas', 'Peine para el cuidado del pelaje de tu mascota', 8990, 20, 'https://jumbocl.vteximg.com.br/arquivos/ids/339891-250-250/Accesorio-Mascota-Corta-U%C3%B1as.jpg?v=638776440296670000', 2
WHERE NOT EXISTS (SELECT 1 FROM producto WHERE id = 6);