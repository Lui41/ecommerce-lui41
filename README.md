# Ecommerce Lui41 Backend

API REST para un e-commerce construida con NestJS, TypeORM y PostgreSQL. El proyecto incluye autenticacion con JWT, control por roles, CRUD de usuarios y productos, categorias, ordenes, carga de imagenes con Cloudinary y documentacion con Swagger.

## Tecnologias

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- JWT
- Swagger
- Cloudinary
- Bcrypt

## Estructura general

- `auth/`: autenticacion y autorizacion
- `users/`: gestion de usuarios
- `products/`: gestion de productos
- `categories/`: categorias de productos
- `orders/`: creacion y consulta de ordenes
- `orderDetails/`: detalle de cada orden
- `files/`: subida de imagenes a Cloudinary
- `config/`: configuracion de base de datos y servicios externos
- `migrations/`: migracion inicial de la base de datos

## Requisitos

- Node.js 20 o superior
- PostgreSQL
- Variables de entorno configuradas
- Cuenta de Cloudinary para la subida de imagenes

## Instalacion

```bash
npm install
```

## Variables de entorno

Crea un archivo `.env` con estas variables:

```env
PORT=3000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
JWT_SECRET=your_jwt_secret
NODE_ENV=development

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Ejecutar en local

```bash
npm run start:dev
```

## Compilar y correr en produccion

```bash
npm run build
npm run start:prod
```

## Migraciones

```bash
npm run migration:run
npm run migration:show
npm run migration:revert
```

## Swagger

La documentacion interactiva queda disponible en:

```text
http://localhost:3000/api
```

## Endpoints principales

### Auth
- `POST /auth/signup`
- `POST /auth/signin`

### Users
- `GET /users`
- `GET /users/:id`
- `PUT /users/:id`
- `DELETE /users/:id`

### Products
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `POST /products/seeder`
- `PUT /products/:id`
- `DELETE /products/:id`

### Categories
- `GET /categories`
- `POST /categories/seeder`

### Orders
- `GET /orders`
- `GET /orders/:id`
- `POST /orders`

### Files
- `PUT /files/uploadImage/:id`

## Notas

- Los usuarios se eliminan de forma logica con `isActive`.
- Los productos dependen de una categoria existente.
- El arranque de la aplicacion carga categorias y productos iniciales usando los datos locales.
- Las rutas protegidas requieren `Bearer token` en Swagger o en el header `Authorization`.

## Despliegue

El proyecto esta preparado para Render usando `DATABASE_URL` y `JWT_SECRET`, mas las credenciales de Cloudinary si se usa carga de imagenes.

## Autor

Luis Alvarez - [Lui41](https://github.com/Lui41)
