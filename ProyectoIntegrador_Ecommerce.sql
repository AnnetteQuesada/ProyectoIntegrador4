USE ecommerce;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE pedido_detalles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);


INSERT INTO usuarios (nombre, email, password)
VALUES ('John', 'John@example.com', '123456');

INSERT INTO productos (nombre, descripcion, precio, stock)
VALUES ('Laptop Lenovo', 'Laptop básica para oficina', 350.00, 10),
       ('Mouse Logitech', 'Mouse inalámbrico', 25.00, 50);

INSERT INTO pedidos (usuario_id, total)
VALUES (1, 375.00);

INSERT INTO pedido_detalles (pedido_id, producto_id, cantidad, precio)
VALUES (1, 1, 1, 350.00),
       (1, 2, 1, 25.00);

SELECT * FROM usuarios;

SELECT * FROM productos WHERE stock > 0;

SELECT p.id, u.nombre, pr.nombre AS producto, d.cantidad, d.precio
FROM pedidos p
JOIN usuarios u ON p.usuario_id = u.id
JOIN pedido_detalles d ON p.id = d.pedido_id
JOIN productos pr ON d.producto_id = pr.id;


