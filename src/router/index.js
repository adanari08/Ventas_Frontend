import { createRouter, createWebHistory } from 'vue-router'
import Productos from '../views/Productos.vue'
import ProductoDetalle from '../views/ProductoDetalle.vue'
import Ventas from '../views/Ventas.vue'
import VentaDetalle from '../views/VentaDetalle.vue'

const routes = [
  { path: '/', redirect: '/productos' },
  { path: '/productos', component: Productos },
  { path: '/productos/:id', component: ProductoDetalle },
  { path: '/ventas', component: Ventas },
  { path: '/ventas/:id', component: VentaDetalle },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
