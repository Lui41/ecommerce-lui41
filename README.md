<div align="center">

<img src=" width="1979" height="794" alt="ChatGPT Image 28 abr 2026, 02_42_54 p m" src="https://github.com/user-attachments/assets/9559b001-884d-45e7-9578-b044cd2e0fb6" />

# 🛒 E-Commerce Tecnológico — Backend
### Proyecto Integrador M4 | Henry Bootcamp

![TypeScript](https://img.shields.io/badge/TypeScript-98%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Henry](https://img.shields.io/badge/Henry-Proyecto%20M4-black?style=for-the-badge)
![Individual](https://img.shields.io/badge/Desarrollo-Individual-2E75B6?style=for-the-badge)

</div>

---

## 📋 Descripción

API REST para la gestión completa de un e-commerce de productos tecnológicos. Incluye autenticación JWT, gestión de usuarios con roles, productos, categorías, órdenes y carga de imágenes. Documentada con Swagger y desarrollada con arquitectura modular en NestJS.

---

## ✨ Funcionalidades principales

- 🔐 **Autenticación JWT** con registro, login y control de roles
- 👤 **Gestión de usuarios** con soft delete (campo `isActive`)
- 📦 **Productos y categorías** con precarga de datos via seeders
- 🛍️ **Órdenes** con detalle de productos asociados
- 🖼️ **Carga de imágenes** para productos
- 🔒 **Guards y middlewares** para protección de rutas y logging
- 📄 **Documentación interactiva** con Swagger

---

## 🏗️ Arquitectura modular

```
src/
├── users/          # Gestión de usuarios
├── auth/           # Autenticación y autorización
├── products/       # Gestión de productos
├── categories/     # Gestión de categorías
├── orders/         # Creación y gestión de órdenes
├── order-details/  # Detalle de cada orden
└── files/          # Carga de imágenes
```

---

## 🛠️ Tech Stack

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-338?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

---

## 🚀 Instalación y uso local

```bash
# Clonar el repositorio
git clone https://github.com/FlorenciaCracogna/Ecommerce-backend-M4
cd Ecommerce-backend-M4/ecommerce-florencia-cracogna

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.development.example .env.development
# Completar las variables en el archivo .env.development

# Correr en desarrollo
npm run start:dev
```

### Documentación Swagger
Una vez levantado el proyecto, la API está disponible en:
```
http://localhost:3000/api
```

---

## ⚙️ Variables de entorno

### `.env.development`
```env
HOST=
PORT=
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
POSTGRES_PASSWORD=
POSTGRES_DB=
```

---

## 📝 Notas técnicas

- Las contraseñas se almacenan encriptadas con **Bcrypt**
- No se realiza eliminación física de usuarios — se usa **soft delete** con campo `isActive`
- Los seeders cargan datos iniciales de productos y categorías al iniciar la app, evitando duplicados
- Se implementan **DTOs** para validación de datos de entrada

---

<div align="center">

**Desarrollado por [Florencia Cracogna](https://github.com/FlorenciaCracogna) — Henry Bootcamp 2026**

<img src="https://capsule-render.vercel.app/api?type=waving&color=3178C6&height=100&section=footer" />

</div>
