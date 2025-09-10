-- ===========================================
-- CARGA DE DATOS BASADA EN TUS ENTIDADES
-- ===========================================

-- EMPLEADOS (8 registros)
INSERT INTO empleado (nombre, turno, cargo, contacto, usuario, contraseña) VALUES
('Juan Pérez', 'Mañana', 0, 'juan@restaurant.com', 'juan', '$2a$10$N9qo8uLOickgx2ZMRBWuNe.5kPX9.OdmVskbBykbBdHQo8B7FoUie'),
('María López', 'Tarde', 1, 'maria@restaurant.com', 'maria', '$2a$10$N9qo8uLOickgx2ZMRBWuNe.5kPX9.OdmVskbBykbBdHQo8B7FoUie'),
('Pedro Gómez', 'Noche', 2, 'pedro@restaurant.com', 'pedro', '$2a$10$N9qo8uLOickgx2ZMRBWuNe.5kPX9.OdmVskbBykbBdHQo8B7FoUie'),
('Laura Ruiz', 'Mañana', 0, 'laura@restaurant.com', 'laura', '$2a$10$N9qo8uLOickgx2ZMRBWuNe.5kPX9.OdmVskbBykbBdHQo8B7FoUie'),
('Andrés Díaz', 'Tarde', 1, 'andres@restaurant.com', 'andres', '$2a$10$N9qo8uLOickgx2ZMRBWuNe.5kPX9.OdmVskbBykbBdHQo8B7FoUie'),
('Lucía Torres', 'Noche', 2, 'lucia@restaurant.com', 'lucia', '$2a$10$N9qo8uLOickgx2ZMRBWuNe.5kPX9.OdmVskbBykbBdHQo8B7FoUie'),
('Sofía Martínez', 'Mañana', 0, 'sofia@restaurant.com', 'sofia', '$2a$10$N9qo8uLOickgx2ZMRBWuNe.5kPX9.OdmVskbBykbBdHQo8B7FoUie'),
('Diego Costa', 'Tarde', 1, 'diego@restaurant.com', 'diego', '$2a$10$N9qo8uLOickgx2ZMRBWuNe.5kPX9.OdmVskbBykbBdHQo8B7FoUie');

-- PRODUCTOS (20 registros)
INSERT INTO productos (nombre, descripcion, precio, disponibilidad, categoria, ingredientes) VALUES
('Pizza Margarita', 'Pizza clásica con tomate y mozzarella', 1200, 'Disponible', 'Pizzas', 'Masa, tomate, mozzarella, albahaca'),
('Pizza Napolitana', 'Pizza con tomate, mozzarella y anchoas', 1300, 'Disponible', 'Pizzas', 'Masa, tomate, mozzarella, anchoas'),
('Pizza Fugazzeta', 'Pizza con cebolla y mozzarella', 1350, 'Disponible', 'Pizzas', 'Masa, cebolla, mozzarella'),
('Pizza Calabresa', 'Pizza con salame y morrón', 1400, 'Disponible', 'Pizzas', 'Masa, tomate, mozzarella, salame, morrón'),
('Hamburguesa Clásica', 'Hamburguesa con carne, lechuga y tomate', 900, 'Disponible', 'Hamburguesas', 'Pan, carne, lechuga, tomate, cebolla'),
('Hamburguesa Doble', 'Hamburguesa con doble carne y queso', 1100, 'Disponible', 'Hamburguesas', 'Pan, doble carne, queso, lechuga, tomate'),
('Papas Fritas Chicas', 'Porción pequeña de papas fritas', 500, 'Disponible', 'Acompañamientos', 'Papas, aceite, sal'),
('Papas Fritas Grandes', 'Porción grande de papas fritas', 700, 'Disponible', 'Acompañamientos', 'Papas, aceite, sal'),
('Sandwich de Lomito', 'Sandwich de lomito completo', 1000, 'Disponible', 'Sandwiches', 'Pan, lomito, lechuga, tomate, huevo'),
('Empanada de Carne', 'Empanada criolla de carne', 200, 'Disponible', 'Empanadas', 'Masa, carne, cebolla, especias'),
('Empanada de Jamón y Queso', 'Empanada de jamón y queso', 220, 'Disponible', 'Empanadas', 'Masa, jamón, queso'),
('Ensalada César', 'Ensalada con pollo y aderezo césar', 850, 'Disponible', 'Ensaladas', 'Lechuga, pollo, crutones, parmesano'),
('Agua Mineral 500ml', 'Agua mineral sin gas', 300, 'Disponible', 'Bebidas', 'Agua mineral'),
('Agua Mineral 1L', 'Agua mineral sin gas 1 litro', 500, 'Disponible', 'Bebidas', 'Agua mineral'),
('Coca-Cola 500ml', 'Gaseosa cola 500ml', 350, 'Disponible', 'Bebidas', 'Agua, azúcar, gas carbónico'),
('Coca-Cola 1.5L', 'Gaseosa cola 1.5 litros', 650, 'Disponible', 'Bebidas', 'Agua, azúcar, gas carbónico'),
('Cerveza Rubia 1L', 'Cerveza rubia artesanal', 900, 'Disponible', 'Bebidas', 'Malta, lúpulo, agua'),
('Cerveza Negra 1L', 'Cerveza negra artesanal', 950, 'Disponible', 'Bebidas', 'Malta tostada, lúpulo, agua'),
('Postre Helado', 'Helado de vainilla con dulce de leche', 600, 'Disponible', 'Postres', 'Helado, dulce de leche'),
('Flan con Dulce de Leche', 'Flan casero con dulce de leche', 550, 'Disponible', 'Postres', 'Huevos, leche, azúcar, dulce de leche');

-- MESAS (8 registros)
INSERT INTO mesa (capacidad, estado, empleado_id) VALUES
(4, true, 1),
(2, false, 4),
(6, true, 7),
(4, true, 1),
(8, false, 4),
(2, true, 7),
(6, true, 1),
(4, false, 4);

-- MEDIO DE PAGO (8 registros)
INSERT INTO mediodepago (nombre, descripción, comisiones, disponibilidad) VALUES
('Efectivo', 'Pago en efectivo', 0, 'Disponible'),
('Tarjeta de Débito', 'Pago con tarjeta de débito', 2, 'Disponible'),
('Tarjeta de Crédito', 'Pago con tarjeta de crédito', 5, 'Disponible'),
('MercadoPago', 'Pago digital con MercadoPago', 3, 'Disponible'),
('Transferencia', 'Transferencia bancaria', 1, 'Disponible'),
('PayPal', 'Pago con PayPal', 4, 'Disponible'),
('Ticket Restaurant', 'Vales de comida', 0, 'Disponible'),
('Criptomonedas', 'Pago con Bitcoin/Ethereum', 2, 'No Disponible');

-- PEDIDOS (8 registros)
INSERT INTO pedidos (numero, fechyhoradepedido, fechyhoradeentrega, estado, tiempoestimado, empleado_id) VALUES
(1001, '2024-09-10 12:30:00', '2024-09-10 13:00:00', 'En Preparación', '30 minutos', 1),
(1002, '2024-09-10 13:15:00', '2024-09-10 13:45:00', 'Entregado', '30 minutos', 4),
(1003, '2024-09-10 14:00:00', NULL, 'Cancelado', '25 minutos', 7),
(1004, '2024-09-10 14:30:00', '2024-09-10 15:00:00', 'En Preparación', '30 minutos', 1),
(1005, '2024-09-10 15:15:00', '2024-09-10 15:45:00', 'Entregado', '30 minutos', 4),
(1006, '2024-09-10 16:00:00', '2024-09-10 16:30:00', 'En Preparación', '30 minutos', 7),
(1007, '2024-09-10 16:45:00', '2024-09-10 17:15:00', 'Entregado', '30 minutos', 1),
(1008, '2024-09-10 17:30:00', '2024-09-10 18:00:00', 'En Preparación', '30 minutos', 4);

-- FACTURAS (8 registros)
INSERT INTO factura (detalle, total, fechayhora, pedidos_id, empleado_id) VALUES
('Pedido #1001 - Pizza Margarita x2, Papas Fritas', 2900, '2024-09-10 13:00:00', 1, 3),
('Pedido #1002 - Hamburguesa Clásica x2, Coca-Cola', 2150, '2024-09-10 13:45:00', 2, 6),
('Pedido #1003 - CANCELADO', 0, '2024-09-10 14:00:00', 3, 6),
('Pedido #1004 - Pizza Napolitana, Papas Grandes', 2000, '2024-09-10 15:00:00', 4, 3),
('Pedido #1005 - Hamburguesa Doble x2, Cerveza', 3100, '2024-09-10 15:45:00', 5, 6),
('Pedido #1006 - Empanadas x4, Agua Mineral', 1180, '2024-09-10 16:30:00', 6, 3),
('Pedido #1007 - Ensalada César, Agua 500ml', 1150, '2024-09-10 17:15:00', 7, 6),
('Pedido #1008 - Postre Helado x2, Flan', 1750, '2024-09-10 18:00:00', 8, 3);

-- TABLAS DE RELACIÓN MANY-TO-MANY

-- PRODUCTOS_PEDIDOS (relación entre productos y pedidos)
INSERT INTO productos_pedidos (productos_id, pedidos_id) VALUES
(1, 1), (7, 1),  -- Pedido 1: Pizza Margarita + Papas Fritas Chicas
(5, 2), (15, 2), -- Pedido 2: Hamburguesa Clásica + Coca-Cola 500ml
(10, 3),         -- Pedido 3: Empanada de Carne (cancelado)
(2, 4), (8, 4),  -- Pedido 4: Pizza Napolitana + Papas Fritas Grandes
(6, 5), (17, 5), -- Pedido 5: Hamburguesa Doble + Cerveza Rubia
(10, 6), (11, 6), (13, 6), -- Pedido 6: Empanadas + Agua
(12, 7), (13, 7), -- Pedido 7: Ensalada César + Agua
(19, 8), (20, 8); -- Pedido 8: Postre Helado + Flan

-- MESA_PEDIDOS (relación entre mesas y pedidos)
INSERT INTO mesa_pedidos (mesa_id, pedidos_id) VALUES
(2, 1),  -- Mesa 2 - Pedido 1
(5, 2),  -- Mesa 5 - Pedido 2
(3, 3),  -- Mesa 3 - Pedido 3
(1, 4),  -- Mesa 1 - Pedido 4
(8, 5),  -- Mesa 8 - Pedido 5
(7, 6),  -- Mesa 7 - Pedido 6
(6, 7),  -- Mesa 6 - Pedido 7
(4, 8);  -- Mesa 4 - Pedido 8