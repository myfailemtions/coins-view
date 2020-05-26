import React from 'react'
import renderer from 'react-test-renderer'

import SearchInput from './SearchInput'

it('renders correctly Search Input', () => {
  const input = renderer.create(<SearchInput />).toJSON()
  expect(input).toMatchSnapshot()
})
