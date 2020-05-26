import React from 'react'
import renderer from 'react-test-renderer'

import ButtonsControls from './ButtonsControls'

it('renders correctly ButtonsControls', () => {
  const input = renderer.create(<ButtonsControls />).toJSON()
  expect(input).toMatchSnapshot()
})
