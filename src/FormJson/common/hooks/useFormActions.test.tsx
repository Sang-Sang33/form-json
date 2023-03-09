import { act, renderHook } from '@testing-library/react';
import useFormActions from './useFormActions';
import { ETypes } from '../constants';
import { useFormStates } from '../../../../test/test-utils';

describe('useFormActions', () => {
  it('useFormActions should provide four function to change formStates', () => {
    const { result: { current: { formStates, setFormStates } } } = renderHook(() => useFormStates())
    const { result: { current: {
        handleAddSibling,
        handleAddChildren,
        handleDeleteItem,
        handleStateChange
    } } } = renderHook(() => useFormActions({setFormStates}))
    expect(handleAddSibling).not.toBeUndefined()
    expect(handleAddChildren).not.toBeUndefined()
    expect(handleDeleteItem).not.toBeUndefined()
    expect(handleStateChange).not.toBeUndefined()
    expect(formStates).not.toBeUndefined()
  })

  it('The handleAddSibling should add sibling to formStates', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    act(() => {
      actionsResult.current.handleAddSibling([0])
    })
    expect(stateResult.current.formStates.length).toBe(4)
  })

  it('The handleAddSibling should add sibling to formStates', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    act(() => {
      actionsResult.current.handleAddSibling([0, 0])
    })
    expect(stateResult.current.formStates[0].children.length).toBe(2)
  })

  it('The handleDeleteItem should delete the item by path', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    act(() => {
      actionsResult.current.handleDeleteItem([0])
    })
    expect(stateResult.current.formStates.length).toEqual(2)
  })

  it('The handleDeleteItem should delete the children item by path', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    act(() => {
      actionsResult.current.handleDeleteItem([0, 0])
    })
    expect(stateResult.current.formStates[0].children.length).toEqual(0)
  })

  it('1. The handleAddChildren should add the children item by path', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    act(() => {
      actionsResult.current.handleAddChildren([0])
    })
    expect(stateResult.current.formStates[0].children.length).toEqual(2)
  })

  it('2. The handleAddChildren should add the children item by path', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    act(() => {
      actionsResult.current.handleStateChange([1], 'type', ETypes.String)
    })
    expect(stateResult.current.formStates[1].type).toEqual(ETypes.String)
  })

  it('The handleStateChange should change the state value', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    act(() => {
      actionsResult.current.handleStateChange([0, 0], 'value', "kill alen twice")
    })
    expect(stateResult.current.formStates[0].children[0].value).toEqual("kill alen twice")
  })

  it('when the type change to "object" or "array", the current item"s value should be empty', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    act(() => {
      actionsResult.current.handleStateChange([1], 'type', ETypes.Array)
    })
    expect(stateResult.current.formStates[1].type).toEqual(ETypes.Array)
    expect(stateResult.current.formStates[1].value).toEqual("")
  })

  it('when the type change to "boolean", the type fo value should be boolean', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    act(() => {
      actionsResult.current.handleStateChange([1], 'type', ETypes.Boolean)
    })
    expect(stateResult.current.formStates[1].type).toEqual(ETypes.Boolean)
    expect(stateResult.current.formStates[1].value).toEqual(true)
  })

})
