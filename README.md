# Ventas_Frontend

Frontend en **Vue 3** para consumir el microservicio de Spring Boot de la tienda (productos y ventas).

Repositorio del backend: https://github.com/adanari08/Ventas_Backend

## Que hace
- **Productos:** ver todos, ver uno (con sus ventas), agregar, editar y eliminar.
- **Ventas:** ver todas, ver una, registrar, editar y eliminar. Al vender se descuenta el stock.

## Tecnologias
- Vue 3 + Vite
- Vue Router
- Axios

## Como correrlo
1. Tener el backend corriendo (por defecto en `http://localhost:8000`).
2. Instalar y correr:
   ```
   npm install
   npm run dev
   ```
3. Abrir http://localhost:5173

## Cambiar la url del backend
Copiar el archivo `.env.example` a `.env` y poner la url:
```
VITE_API_URL=http://localhost:8000
```
Si el backend esta en Render se pone la url de Render. Despues de cambiarlo hay que volver a correr `npm run dev`.

## Estructura
```
src/
  services/   -> llamadas a la API con axios
  views/      -> Productos, ProductoDetalle, Ventas, VentaDetalle
  router/     -> rutas
```
