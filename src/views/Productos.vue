<template>
  <div>
    <h2>Productos</h2>

    <!-- formulario para crear o editar -->
    <div class="tarjeta">
      <h3>{{ editandoId ? 'Editar producto #' + editandoId : 'Nuevo producto' }}</h3>
      <form @submit.prevent="guardar">
        <div class="fila">
          <div class="campo">
            <label>Nombre</label>
            <input v-model="form.nombre" placeholder="Ej. Teclado" />
          </div>
          <div class="campo">
            <label>Precio</label>
            <input v-model="form.precio" type="number" step="0.01" min="0" placeholder="0.00" />
          </div>
          <div class="campo">
            <label>Stock</label>
            <input v-model="form.stock" type="number" min="0" placeholder="0" />
          </div>
        </div>
        <div class="campo">
          <label>Descripción</label>
          <input v-model="form.descripcion" placeholder="Opcional" />
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit" class="btn verde">{{ editandoId ? 'Guardar cambios' : 'Agregar' }}</button>
        <button v-if="editandoId" type="button" class="btn" @click="limpiar">Cancelar</button>
      </form>
    </div>

    <!-- buscar uno por id -->
    <div class="buscar">
      <input v-model="buscarId" type="number" placeholder="Buscar por ID" @keyup.enter="buscar" />
      <button class="btn" @click="buscar">Buscar</button>
    </div>

    <p v-if="mensaje" class="exito">{{ mensaje }}</p>
    <p v-if="cargando">Cargando...</p>

    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in productos" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.nombre }}</td>
          <td>{{ p.descripcion || '-' }}</td>
          <td>{{ dinero(p.precio) }}</td>
          <td :class="{ rojo: p.stock === 0 }">{{ p.stock }}</td>
          <td>
            <router-link :to="'/productos/' + p.id" class="btn chico">Ver</router-link>
            <button class="btn chico" @click="editar(p)">Editar</button>
            <button class="btn chico rojo-btn" @click="eliminar(p)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="productos.length === 0">
          <td colspan="6">No hay productos registrados</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import productoService from '../services/productoService'
import { mensajeError } from '../services/api'
import { dinero } from '../services/formato'

export default {
  data() {
    return {
      productos: [],
      form: { nombre: '', descripcion: '', precio: '', stock: '' },
      editandoId: null,
      buscarId: '',
      cargando: false,
      error: '',
      mensaje: '',
    }
  },
  mounted() {
    this.cargar()
  },
  methods: {
    dinero,
    async cargar() {
      this.cargando = true
      try {
        const res = await productoService.listar()
        this.productos = res.data
      } catch (e) {
        this.error = mensajeError(e)
      }
      this.cargando = false
    },
    async guardar() {
      this.error = ''
      this.mensaje = ''
      const datos = {
        nombre: this.form.nombre,
        descripcion: this.form.descripcion || null,
        precio: this.form.precio === '' ? null : Number(this.form.precio),
        stock: this.form.stock === '' ? null : Number(this.form.stock),
      }
      try {
        if (this.editandoId) {
          await productoService.actualizar(this.editandoId, datos)
          this.mensaje = 'Producto actualizado'
        } else {
          await productoService.crear(datos)
          this.mensaje = 'Producto agregado'
        }
        this.limpiar()
        this.cargar()
      } catch (e) {
        this.error = mensajeError(e)
      }
    },
    editar(p) {
      this.editandoId = p.id
      this.form = { nombre: p.nombre, descripcion: p.descripcion || '', precio: p.precio, stock: p.stock }
      window.scrollTo(0, 0)
    },
    limpiar() {
      this.editandoId = null
      this.form = { nombre: '', descripcion: '', precio: '', stock: '' }
      this.error = ''
    },
    async eliminar(p) {
      if (!confirm('¿Seguro que quieres eliminar ' + p.nombre + '?')) return
      this.mensaje = ''
      try {
        await productoService.eliminar(p.id)
        this.mensaje = 'Producto eliminado'
        this.cargar()
      } catch (e) {
        alert(mensajeError(e))
      }
    },
    buscar() {
      if (this.buscarId) this.$router.push('/productos/' + this.buscarId)
    },
  },
}
</script>
