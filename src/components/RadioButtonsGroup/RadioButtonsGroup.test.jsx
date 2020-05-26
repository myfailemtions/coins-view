import React from 'react'
import renderer from 'react-test-renderer'

import RadioButtonsGroup from './RadioButtonsGroup'

it('renders correctly Search Input', () => {
  const input = renderer.create(<RadioButtonsGroup />).toJSON()
  expect(input).toMatchSnapshot()
})
