import React from 'react'
import renderer from 'react-test-renderer'

import FiltersControls from './FiltersControls'

it('renders correctly FiltersControls', () => {
  const input = renderer.create(<FiltersControls />).toJSON()
  expect(input).toMatchSnapshot()
})
