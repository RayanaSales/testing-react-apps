// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', async () => {
  let result
  function TestComponent() {
    result = useCounter()
    return null
  }

  render(<TestComponent />)
  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)
  // console.log(result);

  /**
   * [KCD] The act function is telling react: "hey im gonna do some stuff that might cause some updates, and after my callback its all finished I want you to flush all side effects from react. My component its stable".
   *
   * This was not needed before, because we were using user events, which wrapps everything in act calls. But it's now necessary because we are calling the increment and decrement functions directly - and because of that you have to manually wrap it with act function.
   *
   */
})
