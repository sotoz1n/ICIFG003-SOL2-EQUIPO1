-- Inserción de Clientes iniciales adaptado a tus columnas reales (REQ5)
INSERT INTO cliente (id, rut, nombre, apellido, correo, direccion, telefono, fecha_registro) 
SELECT 1, '12345678-9', 'Juan', 'Pérez', 'juan.perez@email.com', 'Av. Collao 1200, Concepción', '+56912345678', '2026-06-16'
WHERE NOT EXISTS (SELECT 1 FROM cliente WHERE id = 1);

INSERT INTO cliente (id, rut, nombre, apellido, correo, direccion, telefono, fecha_registro) 
SELECT 2, '98765432-1', 'María', 'Flores', 'maria.flores@email.com', 'Calle Los Carreras 450, Concepción', '+56987654321', '2026-06-16'
WHERE NOT EXISTS (SELECT 1 FROM cliente WHERE id = 2);


-- Inserción previa de Categorías obligatoria para evitar fallos de llave foránea en productos
INSERT INTO categoria_producto (id, nombre_categoria, descripcion)
SELECT 1, 'Alimentos', 'Comida para perros, gatos y mascotas en general'
WHERE NOT EXISTS (SELECT 1 FROM categoria_producto WHERE id = 1);

INSERT INTO categoria_producto (id, nombre_categoria, descripcion)
SELECT 2, 'Accesorios', 'Juguetes, collares, correas y camas'
WHERE NOT EXISTS (SELECT 1 FROM categoria_producto WHERE id = 2);


-- Inserción de Productos iniciales adaptado a tus columnas reales
INSERT INTO producto (id, nombre, descripcion, precio, stock, imagen, id_categoria) 
SELECT 1, 'Alimento Perro Adulto 15kg', 'Nutrición completa para mascotas adultas', 35990.00, 50, 'https://unimarc.vtexassets.com/arquivos/ids/246947/000000000000168870-UN-01.jpg.jpg?v=638755113566130000', 1
WHERE NOT EXISTS (SELECT 1 FROM producto WHERE id = 1);

INSERT INTO producto (id, nombre, descripcion, precio, stock, imagen, id_categoria) 
SELECT 2, 'Collar Ajustable Reflectante', 'Collar de alta visibilidad nocturna para paseos', 7990.00, 30, 'https://www.superzoo.cl/on/demandware.static/-/Sites-SuperZoo-master-catalog/default/dwd1d829d0/images/8941_m1.jpg', 2
WHERE NOT EXISTS (SELECT 1 FROM producto WHERE id = 2);