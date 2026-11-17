import api from './api'

export default {
  listar() {
    return api.get('/api/productos')
  },
  obtener(id) {
    return api.get('/api/productos/' + id)
  },
  crear(producto) {
    return api.post('/api/productos', producto)
  },
  actualizar(id, producto) {
    return api.put('/api/productos/' + id, producto)
  },
  eliminar(id) {
    return api.delete('/api/productos/' + id)
  },
}
