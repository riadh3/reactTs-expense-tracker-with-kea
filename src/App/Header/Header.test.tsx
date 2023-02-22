import React from 'react'
import { render as _render, screen } from '@testing-library/react'
import { Header } from './Header'
import { initKea } from '../../initKea'
import { Provider } from 'kea'

const render = (element: React.ReactElement) => _render(<Provider>{element}</Provider>)

describe('App', () => {
  beforeEach(initKea)

  test('renders learn kea link', () => {
    render(<Header />)
    const linkElement = screen.getByText(/learn kea/i)
    expect(linkElement).toBeInTheDocument()
  })
})
