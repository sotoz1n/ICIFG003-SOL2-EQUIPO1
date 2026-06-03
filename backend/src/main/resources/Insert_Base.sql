-- ========================================================
-- INSERCIÓN DE DATOS DE PRUEBA (DML)
-- ========================================================

--Productos 
INSERT INTO categoria_producto (nombre_categoria, descripcion) VALUES 
('Perros', 'Alimentos, juguetes y accesorios para caninos'),
('Gatos', 'Alimentos, arenas y rascadores para felinos'),
('Accesorios', 'Correas, arneses, platos y transportadoras');

--Veterinarios
INSERT INTO veterinario (nombre, apellido, especialidad, correo, telefono) VALUES 
('Carlos', 'Mendoza', 'Cirugía General', 'carlos.mendoza@petshop.cl', '+56967676767'),
('Ana', 'Silva', 'Medicina Felina', 'ana.silva@petshop.cl', '+56933334444'),
('Laura', 'Rojas', 'Dermatología', 'laura.rojas@petshop.cl', '+56955556666');

--Clientes 
INSERT INTO cliente (rut, nombre, apellido, correo, telefono, direccion) VALUES 
('12.345.678-9', 'Juan', 'Pérez', 'juan.perez@gmail.com', '+56977778888', 'Av. O''Higgins 1020, Concepción'),
('18.765.432-1', 'María', 'González', 'maria.g@outlook.com', '+56999990000', 'Calle Los Carrera 450, Chiguayante');

--Servicios 
INSERT INTO servicio (nombre_servicio, descripcion, valor) VALUES 
('Consulta General', 'Evaluación clínica de rutina y diagnóstico básico', 15000),
('Vacunación', 'Aplicación de vacunas óctuple, triple felina o antirrábica', 18000),
('Peluquería Canina', 'Baño, corte de pelo y corte de uñas según raza', 22000);

--Productos
INSERT INTO producto (nombre, descripcion, precio, stock, imagen, id_categoria) VALUES 
('Alimento Premium Perros', 'Saco de 15kg para perro adulto raza mediana', 18990, 45, 'assets/imagenes/alimento-perro.jpg', 1),
('Arena Sanitaria Gatos', 'Arena aglutinante premium saco de 10kg', 7990, 80, 'assets/imagenes/arena-gatos.jpg', 2),
('Correa Retráctil', 'Correa de 5 metros reforzada para paseo', 12990, 25, 'assets/imagenes/correa.jpg', 3),
('Juguete Ratón de Goma', 'Juguete interactivo para gatos con sonido', 3490, 15, 'assets/imagenes/raton-goma.jpg', 2);

--Mascotaas
INSERT INTO mascota (nombre, especie, raza, sexo, fecha_nacimiento, peso, id_cliente) VALUES 
('Rocky', 'Perro', 'Pastor Alemán', 'M', '2022-03-15', 32.50, 1),
('Luna', 'Gato', 'Siamés', 'F', '2023-08-20', 4.20, 2);

--Carritos de Compra
INSERT INTO carrito (id_cliente) VALUES (1), (2);

--Detalles de los Carritos
INSERT INTO detalle_carrito (id_carrito, id_producto, cantidad, precio_unitario) VALUES 
(1, 1, 1, 18990), -- Juan compra 1 Alimento Premium
(1, 3, 1, 12990), -- Juan compra 1 Correa Retráctil
(2, 2, 2, 7990);  -- María compra 2 Arenas Sanitarias

--Reservas Clínicas
INSERT INTO reserva (fecha_hora_reserva, estado, observacion, id_mascota, id_veterinario, id_servicio) VALUES 
('2026-06-10 10:30:00', 'Confirmada', 'Control de vacunas anuales', 1, 1, 2),
('2026-06-11 15:00:00', 'Pendiente', 'Corte de pelo de temporada', 1, 3, 3);

--Historial Medico
INSERT INTO historial_medico (fecha_atencion, diagnostico, tratamiento, observaciones, id_mascota, id_veterinario) VALUES 
('2026-05-20', 'Alergia alimentaria leve', 'Cambio a alimento hipoalergénico por 30 días', 'Controlar evolución en el próximo mes', 1, 3);