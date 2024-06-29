// testing custom hooks
// http://localhost:3000/counter-hook

import {renderHook, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', async () => {
  const {result} = renderHook(useCounter)

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
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 3}})

  expect(result.current.count).toBe(3)
  act(() => result.current.increment())
  expect(result.current.count).toBe(4)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(3)
})

test('allows customization of the step', async () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 2}})

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('the step can be changed', () => {
  const {result, rerender} = renderHook(useCounter, {
    initialProps: {step: 3},
  })

  // the rerender function is useful to change the props, because will just call the component again

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  rerender({step: 2})
  act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})
