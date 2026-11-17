<template>
  <div>
    <router-link to="/ventas">← Regresar</router-link>

    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="venta" class="tarjeta">
      <h2>Venta #{{ venta.id }}</h2>
      <p><b>Producto:</b> <router-link :to="'/productos/' + venta.productoId">{{ venta.nombreProducto }}</router-link></p>
      <p><b>Cantidad:</b> {{ venta.cantidad }}</p>
      <p><b>Precio unitario:</b> {{ dinero(venta.precioUnitario) }}</p>
      <p><b>Total:</b> {{ dinero(venta.total) }}</p>
      <p><b>Fecha:</b> {{ fecha(venta.fecha) }}</p>
    </div>
  </div>
</template>

<script>
import ventaService from '../services/ventaService'
import { mensajeError } from '../services/api'
import { dinero, fecha } from '../services/formato'

export default {
  data() {
    return { venta: null, error: '' }
  },
  mounted() {
    this.cargar()
  },
  methods: {
    dinero,
    fecha,
    async cargar() {
      try {
        this.venta = (await ventaService.obtener(this.$route.params.id)).data
      } catch (e) {
        this.error = mensajeError(e)
      }
    },
  },
}
</script>
