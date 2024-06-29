// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

function setup({initialProps} = {}) {
  const result = {}
  function TestComponent() {
    result.current = useCounter(initialProps)
    return null
  }
  render(<TestComponent />)
  return result
}

test('exposes the count and increment/decrement functions', async () => {
  let result = setup()

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)

  /**
   * [KCD] The act function is telling react: "hey im gonna do some stuff that might cause some updates, and after my callback its all finished I want you to flush all side effects from react. My component its stable".
   *
   * This was not needed before, because we were using user events, which wrapps everything in act calls. But it's now necessary because we are calling the increment and decrement functions directly - and because of that you have to manually wrap it with act function.
   *
   */
})

test('allows customization of the initial count', async () => {
  let result = setup({initialProps: {initialCount: 3}})

  expect(result.current.count).toBe(3)
  act(() => result.current.increment())
  expect(result.current.count).toBe(4)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(3)
})

test('allows customization of the step', async () => {
  let result = setup({initialProps: {step: 2}})

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})
