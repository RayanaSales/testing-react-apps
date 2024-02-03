// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

/* 
  the difference between fireEvent and userEvent is that userEvent is more like a real user interaction
  the fireEvent is more like a programmatic interaction
  for example: the fireEvent.click() will not trigger the onMouseDown and onMouseUp events, but the fireEvent will trigger them along the click event, because this imitates the real user interaction.
  */

test('counter increments and decrements when the buttons are clicked', async () => {
  render(<Counter />)
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i)

  expect(message).toHaveTextContent('Current count: 0')
  userEvent.click(increment)
  await waitFor(() => expect(message).toHaveTextContent('Current count: 1'))
  userEvent.click(decrement)
  await waitFor(() => expect(message).toHaveTextContent('Current count: 0'))
})