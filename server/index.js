const express = require('express')
const bodyParser = require('body-parser')
const pino = require('express-pino-logger')()
const axios = require('axios')

const API =
  'https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products/'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(pino)

app.get('/api/products', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json')
    const { data } = await axios.get(API)
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

app.listen(process.env.SERVER_PORT, () =>
  console.log(
    `Express server is running on localhost:${process.env.SERVER_PORT}`
  )
)
