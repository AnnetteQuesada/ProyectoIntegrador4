# ProyectoIntegrador4

Este proyecto implementa una API RESTful para un sistema de ecommerce.
Incluye:

Base de datos en MySQL con tablas: usuarios, productos, pedidos, pedido_detalles.

Servidor en Node.js + Express con endpoints CRUD para cada entidad.

Seguridad básica: contraseñas hasheadas con bcrypt, validación de datos con express-validator, y rate limiting para prevenir ataques de fuerza bruta.

Pruebas con Postman para verificar todas las operaciones CRUD.


Iniciar el servidor:

bash
node server.js

Endpoints

Usuarios:

GET /usuarios → obtener todos los usuarios

GET /usuarios/:id → obtener usuario por ID

POST /usuarios → crear usuario

PUT /productos/:id → actualizar producto

DELETE /productos/:id → eliminar producto

Pedidos:
GET /pedidos → obtener todos los pedidos

GET /pedidos/:id → obtener pedido por ID

POST /pedidos → crear pedido

PUT /pedidos/:id → actualizar pedido

DELETE /pedidos/:id → eliminar pedido

Detalles de Pedido:
GET /pedido_detalles → obtener todos los detalles

GET /pedido_detalles/:id → obtener detalle por ID

POST /pedido_detalles → crear detalle

PUT /pedido_detalles/:id → actualizar detalle

DELETE /pedido_detalles/:id → eliminar detalle

Pruebas con Postman
Abrir Postman y crear una colección llamada Ecommerce API.

Agregar los endpoints anteriores con la URL base: http://localhost:3000
