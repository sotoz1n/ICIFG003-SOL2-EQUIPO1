--Productos 
INSERT INTO categoria_producto (nombre_categoria, descripcion) VALUES 
('Perros', 'Alimentos, juguetes y accesorios para caninos'),
('Gatos', 'Alimentos, arenas y rascadores para felinos'),
('Accesorios', 'Correas, arneses, platos y transportadoras');

--Veterinarios
INSERT INTO veterinario (nombre, apellido, especialidad, correo, telefono) VALUES 
('Carlos', 'Mendoza', 'Cirugia General', 'carlos.mendoza@petshop.cl', '+56967676767'),
('Ana', 'Silva', 'Medicina Felina', 'ana.silva@petshop.cl', '+56967676767'),
('Laura', 'Rojas', 'Dermatologia', 'laura.rojas@petshop.cl', '+56967676767');

--Clientes 
INSERT INTO cliente (rut, nombre, apellido, correo, telefono, direccion) VALUES 
('12.345.678-9', 'Juan', 'Perez', 'juan.perez@gmail.com', '+56977778888', 'Av. OHiggins 1020, Concepcion'),
('18.765.432-1', 'Maria', 'Gonzalez', 'maria.g@outlook.com', '+56999990000', 'Calle Los Carrera 450, Chiguayante');

--Servicios 
INSERT INTO servicio (nombre_servicio, descripcion, valor) VALUES 
('Consulta General', 'Evaluacion clinica de rutina y diagnostico basico', 15000),
('Vacunacion', 'Aplicacion de vacunas octuple, triple felina o antirrabica', 18000),
('Peluqueria Canina', 'Lavado, corte de pelo y corte de garras segun raza', 22000);

--Productos
INSERT INTO producto (nombre, descripcion, precio, stock, imagen, id_categoria) VALUES 
('Alimento Premium Perros', 'Saco de 15kg para perro adulto raza mediana', 18990, 45, 'https://vetfarma.cl/wp-content/uploads/2021/08/alfa-dog-premium-senior-20.jpg', 1),
('Arena Sanitaria Gatos', 'Arena aglutinante premium saco de 10kg', 7990, 80, 'https://alvicl.vtexassets.com/arquivos/ids/158992/Arena-gato-ecologica.jpg?v=637880504582700000', 2),
('Correa Retractil', 'Correa de 5 metros reforzada para paseo', 12990, 25, 'https://zoomypuppy.cl/cdn/shop/files/correa_retractil_truelove_negra_1080x.jpg?v=1724080605', 3),
('Juguete Raton de Goma', 'Juguete interactivo para gatos con sonido', 3490, 15, 'https://arenaparamascotas.cl/wp-content/uploads/2024/09/Juguete-Raton-con-sonido-para-gatos-2.jpg', 2),
('Arnes', 'Para llevar a tu mascota comoda', 15990, 12, 'https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/400x400/easy/1334936/variant/images/71399438-2abd-4617-afa5-fcf5017cb092/1334936-0000-001.jpg', 3),
('Casa para perro', 'medidas: 2,00mt x 1,50mt', 49990, 2, 'https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/cl/easy/1255099/variant/670fdfc6e237505f625a7c31/images/fe53ba1c-c6f4-42a7-9ebb-d0247ee44910/1255099-0250-001.jpg', 1),
('Hueso de Goma Masticable', 'Juguete resistente para perros mordelones.', 4500, 30, 'https://sc04.alicdn.com/kf/HTB1ZlX3bhGYBuNjy0Fnq6x5lpXaD.jpg', 1),
('Correa de Cuero Premium', 'Correa de paseo de 2 metros de largo, alta resistencia.', 15990, 15, 'https://petcity.cl/wp-content/uploads/2025/06/Correa-Premium-Perros-Star-Wars-300x300.jpg', 1),
('Rascador Torre de 3 Pisos', 'Centro de entretenimiento para gatos con hamaca.', 35000, 5, 'https://media.adeo.com/mkp/6db9cb3decbb79b6abcdd7feba5775fd/media.jpeg?width=650&height=650&format=jpg&quality=80&fit=bounds', 2),
('Catnip Orgánico 50g', 'Hierba gatera de alta calidad para relajar a tu felino.', 3990, 50, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIYsZQCd-ww_Qc3DLScTpVOlNiiNgtr1ZmSw&s', 2),
('Plato Metálico Antideslizante', 'Plato de acero inoxidable fácil de lavar.', 5990, 40, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT78eCXysESVjm2bWLk9lqq32H4Ik8V9WpiuA&s', 3),
('Cama Acolchada Talla M', 'Cama suave y lavable para mascotas medianas.', 22990, 10, 'https://petlandiachile.cl/cdn/shop/files/cama-perro-acolchada-cafe-l.webp?v=1778688225&width=480', 3);

--Mascotaas
INSERT INTO mascota (nombre, especie, raza, sexo, fecha_nacimiento, peso, id_cliente) VALUES 
('Kenai', 'Perro', 'Pastor Aleman', 'M', '2022-03-15', 32.50, 1),
('Luna', 'Gato', 'Siames', 'F', '2023-08-20', 4.20, 2),
('Nanuk', 'Perro', 'Goden', 'M', '2020-07-17', 4.20, 2);

--Carritos de Compra
INSERT INTO carrito (id_cliente) VALUES (1), (2);

--Detalles de los Carritos
INSERT INTO detalle_carrito (id_carrito, id_producto, cantidad, precio_unitario) VALUES 
(1, 1, 1, 18990), -- Juan compra 1 Alimento Premium
(1, 3, 1, 12990), -- Juan compra 1 Correa Retráctil
(2, 2, 2, 7990);  -- María compra 2 Arenas Sanitarias

--Reservas 
INSERT INTO reserva (fecha_hora_reserva, estado, observacion, id_mascota, id_veterinario, id_servicio) VALUES 
('2026-06-10 10:30:00', 'Confirmada', 'Control de vacunas anuales', 1, 1, 2),
('2026-06-11 15:00:00', 'Pendiente', 'Corte de pelo de temporada', 1, 3, 3);

--Historial Medico
INSERT INTO historial_medico (fecha_atencion, diagnostico, tratamiento, observaciones, id_mascota, id_veterinario) VALUES 
('2026-05-20', 'Alergia alimentaria leve', 'Cambio a alimento hipoalergenico por 30 días', 'Controlar evolucion en el proximo mes', 1, 3);
