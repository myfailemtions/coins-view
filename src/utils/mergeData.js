export const mergeData = ({ products: { data }, price }) => {
  const productsData = data
  const priceData = price.data
  const result = productsData.map((product) => {
    const findPrice = priceData.find(({ s }) => product.s)
    const priceInfo = findPrice || {}
    return {
      ...product,
      priceInfo
    }
  })
  return result
}
