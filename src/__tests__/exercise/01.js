// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'
import ReactDOM from 'react-dom'

// NOTE: this is a new requirement in React 18
// https://react.dev/blog/2022/03/08/react-18-upgrade-guide#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

beforeEach(() => {
  document.body.innerHTML = ''

  /** if you have many tests, testing the same component, you can use the cleanup function, or remove the component manually
   *  to make sure that the dom is clean after each test. Or you can just cleanup the component on the beforeEach function 💅🏻✨
   *  */
})

test('counter increments and decrements when the buttons are clicked', () => {
  console.log(document.body.innerHTML)
  const div = document.createElement('div')
  document.body.append(div)

  ReactDOM.render(<Counter />, div)

  const [decrement, increment] = document.body.querySelectorAll('button')
  const message = div.firstChild.querySelector('div')

  expect(message.textContent).toBe('Current count: 0')

  increment.click()
  expect(message.textContent).toBe('Current count: 1')

  decrement.click()
  expect(message.textContent).toBe('Current count: 0')
})

test('counter increments and decrements when the buttons are clicked', () => {
  console.log(document.body.innerHTML)
  const div = document.createElement('div')
  document.body.append(div)

  ReactDOM.render(<Counter />, div)

  const [decrement, increment] = document.body.querySelectorAll('button')
  const message = div.firstChild.querySelector('div')

  expect(message.textContent).toBe('Current count: 0')

  /** Using .click on a DOM node works fine, but what if you wanted to fire an event that doesn't have a dedicated
   * method (like mouseover). Rather than use button.click(), try using button.dispatchEvent:
   * */
  const incrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  increment.dispatchEvent(incrementClickEvent)
  expect(message.textContent).toBe('Current count: 1')

  const decrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  decrement.dispatchEvent(decrementClickEvent)
  expect(message.textContent).toBe('Current count: 0')
})

/* eslint no-unused-vars:0 */
