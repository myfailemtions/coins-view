import React from 'react'
import { create } from 'react-test-renderer'
import { WebSocket, Server } from 'mock-socket'
import App from './App'

window.WebSocket = WebSocket
global.WebSocket = window.WebSocket

const products = {
  data: [
    {
      s: 'BNBBTC',
      st: 'TRADING',
      b: 'BNB',
      q: 'BTC',
      ba: '',
      qa: '฿',
      i: 0.01,
      ts: 0.0000001,
      an: 'BNB',
      qn: 'Bitcoin',
      o: 0.0018481,
      h: 0.0018524,
      l: 0.0018251,
      c: 0.0018326,
      v: 846445.83,
      qv: 1554.59102055,
      y: 0.0,
      as: 846445.83,
      pm: 'BTC',
      pn: 'BTC',
      cs: 152665937,
      etf: false
    }
  ]
}

class ChatApp {
  constructor(url) {
    this.messages = []
    this.connection = new WebSocket(url)

    this.connection.onmessage = (event) => {
      this.messages.push(event.data)
    }
  }

  sendMessage(message) {
    this.connection.send(message)
  }
}

it('renders correctly Search Input', () => {
  const comp = create(<App />).toJSON()
  expect(comp).toMatchSnapshot()
})

it('should fetch a list of values', () => {
  fetch.mockResponseOnce(JSON.stringify(products))
  const fetchSpy = jest.spyOn(window, 'fetch')
  create(<App />)
  expect(fetchSpy).toBeCalled()
})

it('connect websockets response', () => {
  const fetchSpy = jest.spyOn(window, 'WebSocket')
  create(<App />)
  setTimeout(() => {
    expect(fetchSpy).toBeCalled()
  }, 100)
})
