import api from './api'

export default {
  listar() {
    return api.get('/api/ventas')
  },
  obtener(id) {
    return api.get('/api/ventas/' + id)
  },
  porProducto(productoId) {
    return api.get('/api/ventas/producto/' + productoId)
  },
  registrar(venta) {
    return api.post('/api/ventas', venta)
  },
  actualizar(id, venta) {
    return api.put('/api/ventas/' + id, venta)
  },
  eliminar(id) {
    return api.delete('/api/ventas/' + id)
  },
}
