<template>
  <div>
    <router-link to="/productos">← Regresar</router-link>

    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="producto" class="tarjeta">
      <h2>{{ producto.nombre }}</h2>
      <p><b>ID:</b> {{ producto.id }}</p>
      <p><b>Descripción:</b> {{ producto.descripcion || 'Sin descripción' }}</p>
      <p><b>Precio:</b> {{ dinero(producto.precio) }}</p>
      <p><b>Stock:</b> {{ producto.stock }}</p>
    </div>

    <div v-if="producto">
      <h3>Ventas de este producto</h3>
      <table>
        <thead>
          <tr><th>ID Venta</th><th>Cantidad</th><th>Total</th><th>Fecha</th></tr>
        </thead>
        <tbody>
          <tr v-for="v in ventas" :key="v.id">
            <td><router-link :to="'/ventas/' + v.id">{{ v.id }}</router-link></td>
            <td>{{ v.cantidad }}</td>
            <td>{{ dinero(v.total) }}</td>
            <td>{{ fecha(v.fecha) }}</td>
          </tr>
          <tr v-if="ventas.length === 0"><td colspan="4">Este producto no tiene ventas</td></tr>
        </tbody>
      </table>
      <p><b>Total vendido:</b> {{ dinero(totalVendido) }}</p>
    </div>
  </div>
</template>

<script>
import productoService from '../services/productoService'
import ventaService from '../services/ventaService'
import { mensajeError } from '../services/api'
import { dinero, fecha } from '../services/formato'

export default {
  data() {
    return { producto: null, ventas: [], error: '' }
  },
  computed: {
    totalVendido() {
      return this.ventas.reduce((suma, v) => suma + Number(v.total), 0)
    },
  },
  watch: {
    '$route.params.id'() {
      this.cargar()
    },
  },
  mounted() {
    this.cargar()
  },
  methods: {
    dinero,
    fecha,
    async cargar() {
      this.error = ''
      this.producto = null
      try {
        const id = this.$route.params.id
        this.producto = (await productoService.obtener(id)).data
        this.ventas = (await ventaService.porProducto(id)).data
      } catch (e) {
        this.error = mensajeError(e)
      }
    },
  },
}
</script>
