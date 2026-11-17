# tienda-frontend

Frontend en **Vue 3** para consumir el microservicio de Spring Boot de la tienda (productos y ventas).

Repositorio del backend: (poner aqui el link del repo del backend)

## Que hace
- **Productos:** ver todos, ver uno (con sus ventas), agregar, editar y eliminar.
- **Ventas:** ver todas, ver una, registrar, editar y eliminar. Al vender se descuenta el stock.

## Como correrlo
1. Tener el backend corriendo (por defecto en `http://localhost:8000`).
2. Instalar y correr:
   ```
   npm install
   npm run dev
   ```
3. Abrir http://localhost:5173

## Cambiar la url del backend
En el archivo `.env`:
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
