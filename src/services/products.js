const fetchProducts = async () => {
  const products = await fetch('/api/products')
  return products.json()
}

const fetchPrice = () =>
  new WebSocket('wss://stream.binance.com/stream?streams=!miniTicker@arr')

export { fetchProducts, fetchPrice }
