🛍️ MercApp — Aplicación de Catálogo y Carrito de Compras

Proyecto académico desarrollado con Vue 3 + Vite en el frontend y Node.js + Express en el backend, cumpliendo con todas las funcionalidades solicitadas: CRUD de productos, gestión de categorías, carrito de compras persistente y arquitectura separada.

📂 Estructura del Proyecto
mercapp/
 ├── backend/     → API REST con Express, fileDb y rutas de productos/categorías
 └── frontend/    → Aplicación en Vue 3 (Vite), router, composables y vistas

🚀 Tecnologías Utilizadas
Frontend

Vue 3 (Composition API)

Vue Router

Vite

JavaScript ES Modules

CSS nativo

Backend

Node.js

Express.js

fileDb (JSON como base de datos)

CORS

⚙️ Instalación y Ejecución
🔧 1. Clonar el repositorio
git clone https://github.com/AngeloChavezz/mercapp.git

🔧 2. Instalar dependencias
Backend
cd backend
npm install
npm run dev

Frontend

Abrir otra terminal:

cd frontend
npm install
npm run dev

📌 Funcionalidades Principales
🛒 Catálogo

Listado completo de productos

Filtro por categoría

Búsqueda por nombre o descripción

Detalles del producto

Imágenes dinámicas

🛍️ Carrito de Compras

Añadir productos al carrito

Eliminar productos

Vaciar carrito

Totales calculados en tiempo real

Persistencia con localStorage

🧩 CRUD de Productos

Crear producto

Editar producto

Eliminar producto

Validaciones completas

Formulario reutilizable

📦 Categorías

Listado dinámico obtenido desde backend

Selección de categoría en formularios

⚠️ Compra Demo

Incluye botón de Finalizar compra (demo) con mensaje simulado.

📁 Base de Datos (FileDB)

products.json

categories.json

La API manipula estos archivos para simular una BD.

📡 Endpoints Principales
Productos
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

Categorías
GET /api/categories

👨‍💻 Autor

Angelo Jordan Chávez Zamora
Estudiante de Ingeniería de Software
Universidad Politécnica Salesiana — UPS
2025

📄 Licencia

Uso académico — libre para evaluación y aprendizaje.