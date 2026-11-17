<template>
  <header class="barra">
    <h1>🛒 Mi Tienda</h1>
    <nav>
      <router-link to="/productos">Productos</router-link>
      <router-link to="/ventas">Ventas</router-link>
    </nav>
  </header>

  <main class="contenedor">
    <router-view />
  </main>
</template>
