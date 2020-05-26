import React from 'react'
import renderer from 'react-test-renderer'

import EnhancedTable from './EnhancedTable'

it('renders correctly EnhancedTable', () => {
  const input = renderer.create(<EnhancedTable />).toJSON()
  expect(input).toMatchSnapshot()
})
