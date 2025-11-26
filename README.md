📦 MercApp — Aplicación de Catálogo y Carrito de Compras

Proyecto académico desarrollado con Vue 3 + Vite en el frontend y Node.js + Express en el backend, cumpliendo con todas las funcionalidades solicitadas:
✔ CRUD de productos
✔ Gestión de categorías
✔ Carrito de compras persistente
✔ Arquitectura desacoplada: Backend ↔ Frontend
✔ Proyecto final completamente funcional

🗂 Estructura del Proyecto
mercapp/
├── backend/     → API REST con Express, fileDb y rutas de productos/categorías
└── frontend/    → Aplicación Vue 3 (Vite), router, composables y vistas

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

fileDb (JSON como almacenamiento)

CORS

🛠 Instalación y Ejecución del Proyecto
🔽 1. Clonar el repositorio
git clone https://github.com/AngeloChavezz/mercapp.git
cd mercapp

🟦 2. Instalación del Backend
cd backend
npm install
npm run dev


Backend por defecto corre en:

http://localhost:3000

🟩 3. Instalación del Frontend

En otra terminal:

cd frontend
npm install
npm run dev


Frontend por defecto corre en:

http://localhost:5173

📡 Endpoints del Backend
Productos
Método	Ruta	Descripción
GET	/api/products	Obtener todos los productos
GET	/api/products/:id	Obtener producto por ID
POST	/api/products	Crear producto
PUT	/api/products/:id	Actualizar producto
DELETE	/api/products/:id	Eliminar producto
Categorías
Método	Ruta
GET	/api/categories
🛒 Funciones Implementadas en el Frontend

Listado de productos

Vista detallada

CRUD de productos (crear, editar, eliminar)

Selección de categorías

Carrito persistente (localStorage)

Eliminación por ítem

Vaciar carrito

Confirmación de compra (Modo Demo)

👤 Autor

Angelo Jordan Chávez Zamora
Estudiante de Ingeniería de Software
Universidad Politécnica Salesiana – UPS
Año: 2025

📄 Licencia

Uso académico, libre para fines de evaluación y aprendizaje.