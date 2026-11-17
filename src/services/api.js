import axios from 'axios'

// la url se cambia en el archivo .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
})

// saca el mensaje de error que manda el backend
export function mensajeError(error) {
  if (!error.response) return 'No se pudo conectar con el servidor'
  const data = error.response.data
  if (data && data.detalles) return Object.values(data.detalles).join(', ')
  if (data && data.mensaje) return data.mensaje
  if (data && data.error) return data.error
  return 'Error ' + error.response.status
}

export default api
