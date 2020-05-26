import React from 'react'
import renderer from 'react-test-renderer'

import App from './App'

it('renders correctly Search Input', () => {
  const input = renderer.create(<App />).toJSON()
  expect(input).toMatchSnapshot()
})
