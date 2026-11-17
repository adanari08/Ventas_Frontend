export function dinero(valor) {
  return '$' + Number(valor).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function fecha(valor) {
  if (!valor) return ''
  return new Date(valor).toLocaleString('es-MX')
}
