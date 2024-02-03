// simple test with React Testing Library
// http://localhost:3000/counter

import * as React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Counter from '../../components/counter'
// import '@testing-library/jest-dom/extend-expect'
// dont need to import this here, because we are importing the jest-dom/extend-expect to extend the expect function to have the toBeInTheDocument function. Check the file src/setupTests.js

test('counter increments and decrements when the buttons are clicked', () => {
  const {container} = render(<Counter />)
  const [decrement, increment] = container.querySelectorAll('button')
  const message = container.firstChild.querySelector('div')
  // this will render the counter to the document.body, and all the divs inside the counter will be available to the document.body
  // using react testing library, you dont need to clean up the document.body after each test, it will do it for you

  expect(message.textContent).toHaveTextContent('Current count: 0')

  fireEvent.click(increment)
  expect(message.textContent).toHaveTextContent('Current count: 1')

  fireEvent.click(decrement)
  expect(message.textContent).toHaveTextContent('Current count: 0')
})
