<template>
  <div>
    <h2>Ventas</h2>

    <div class="tarjeta">
      <h3>{{ editandoId ? 'Editar venta #' + editandoId : 'Registrar venta' }}</h3>
      <form @submit.prevent="guardar">
        <div class="fila">
          <div class="campo">
            <label>Producto</label>
            <select v-model="form.productoId">
              <option value="">-- Selecciona --</option>
              <option v-for="p in productos" :key="p.id" :value="p.id">
                {{ p.nombre }} ({{ dinero(p.precio) }} - stock: {{ p.stock }})
              </option>
            </select>
          </div>
          <div class="campo">
            <label>Cantidad</label>
            <input v-model="form.cantidad" type="number" min="1" placeholder="1" />
          </div>
          <div class="campo">
            <label>Total aproximado</label>
            <input :value="dinero(totalPreview)" disabled />
          </div>
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit" class="btn verde">{{ editandoId ? 'Guardar cambios' : 'Registrar venta' }}</button>
        <button v-if="editandoId" type="button" class="btn" @click="limpiar">Cancelar</button>
      </form>
    </div>

    <div class="buscar">
      <input v-model="buscarId" type="number" placeholder="Buscar venta por ID" @keyup.enter="buscar" />
      <button class="btn" @click="buscar">Buscar</button>
    </div>

    <p v-if="mensaje" class="exito">{{ mensaje }}</p>
    <p v-if="cargando">Cargando...</p>

    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio unit.</th>
          <th>Total</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="v in ventas" :key="v.id">
          <td>{{ v.id }}</td>
          <td><router-link :to="'/productos/' + v.productoId">{{ v.nombreProducto }}</router-link></td>
          <td>{{ v.cantidad }}</td>
          <td>{{ dinero(v.precioUnitario) }}</td>
          <td><b>{{ dinero(v.total) }}</b></td>
          <td>{{ fecha(v.fecha) }}</td>
          <td>
            <router-link :to="'/ventas/' + v.id" class="btn chico">Ver</router-link>
            <button class="btn chico" @click="editar(v)">Editar</button>
            <button class="btn chico rojo-btn" @click="eliminar(v)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="ventas.length === 0">
          <td colspan="7">No hay ventas registradas</td>
        </tr>
      </tbody>
    </table>

    <p v-if="ventas.length"><b>Total de todas las ventas:</b> {{ dinero(totalGeneral) }}</p>
  </div>
</template>

<script>
import ventaService from '../services/ventaService'
import productoService from '../services/productoService'
import { mensajeError } from '../services/api'
import { dinero, fecha } from '../services/formato'

export default {
  data() {
    return {
      ventas: [],
      productos: [],
      form: { productoId: '', cantidad: 1 },
      editandoId: null,
      buscarId: '',
      cargando: false,
      error: '',
      mensaje: '',
    }
  },
  computed: {
    totalPreview() {
      const p = this.productos.find((x) => x.id === this.form.productoId)
      return p ? Number(p.precio) * Number(this.form.cantidad || 0) : 0
    },
    totalGeneral() {
      return this.ventas.reduce((suma, v) => suma + Number(v.total), 0)
    },
  },
  mounted() {
    this.cargar()
  },
  methods: {
    dinero,
    fecha,
    async cargar() {
      this.cargando = true
      try {
        this.ventas = (await ventaService.listar()).data
        this.productos = (await productoService.listar()).data
      } catch (e) {
        this.error = mensajeError(e)
      }
      this.cargando = false
    },
    async guardar() {
      this.error = ''
      this.mensaje = ''
      const datos = {
        productoId: this.form.productoId === '' ? null : this.form.productoId,
        cantidad: this.form.cantidad === '' ? null : Number(this.form.cantidad),
      }
      try {
        if (this.editandoId) {
          await ventaService.actualizar(this.editandoId, datos)
          this.mensaje = 'Venta actualizada'
        } else {
          await ventaService.registrar(datos)
          this.mensaje = 'Venta registrada'
        }
        this.limpiar()
        this.cargar() // recargar para ver el stock actualizado
      } catch (e) {
        this.error = mensajeError(e)
      }
    },
    editar(v) {
      this.editandoId = v.id
      this.form = { productoId: v.productoId, cantidad: v.cantidad }
      window.scrollTo(0, 0)
    },
    limpiar() {
      this.editandoId = null
      this.form = { productoId: '', cantidad: 1 }
      this.error = ''
    },
    async eliminar(v) {
      if (!confirm('¿Eliminar la venta #' + v.id + '? El stock se regresa al producto')) return
      this.mensaje = ''
      try {
        await ventaService.eliminar(v.id)
        this.mensaje = 'Venta eliminada'
        this.cargar()
      } catch (e) {
        alert(mensajeError(e))
      }
    },
    buscar() {
      if (this.buscarId) this.$router.push('/ventas/' + this.buscarId)
    },
  },
}
</script>
