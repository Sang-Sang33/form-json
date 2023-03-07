import { act, renderHook } from '@testing-library/react'
import useFormActions from './useFormActions'
import {uniqueId} from "lodash-es";
import {ETypes} from "../constants";
import {IFormItem} from "../constants/type";
import {useState} from "react";
import useJsonState from "./useJsonStates";

function useFormStates() {
  const [formStates, setFormStates] = useState<IFormItem[]>([
    {
      name: 'mikasa',
      value: '',
      id: uniqueId(),
      type: ETypes.Object,
      children: [
        {
          name: 'hobby',
          value: 'kill alen',
          id: uniqueId(),
          type: ETypes.String,
          children: [],
        },
      ],
    },
    {
      name: 'alen',
      value: 12,
      id: uniqueId(),
      type: ETypes.Number,
      children: [],
    },
  ]);

  return {
    formStates,
    setFormStates
  }
}


describe('useJsonState', () => {
  it('useFormActions should provide four function to change formStates', () => {
    const { result: { current: { formStates, setFormStates } } } = renderHook(() => useFormStates())
    const { result: { current: {
        onAddSibling,
        onAddChildren,
        onDeleteFormLine,
        onStateChange
    } } } = renderHook(() => useFormActions(setFormStates))
    expect(onAddSibling).not.toBeUndefined()
    expect(onAddChildren).not.toBeUndefined()
    expect(onDeleteFormLine).not.toBeUndefined()
    expect(onStateChange).not.toBeUndefined()
    expect(formStates).not.toBeUndefined()
  })

  it('The onAddSibling should add sibling to formStates', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions(stateResult.current.setFormStates))
    act(() => {
      actionsResult.current.onAddSibling([0])
    })
    expect(stateResult.current.formStates.length).toBe(3)
  })

  it('The onAddSibling should add sibling to formStates', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions(stateResult.current.setFormStates))
    act(() => {
      actionsResult.current.onAddSibling([0, 0])
    })
    expect(stateResult.current.formStates[0].children.length).toBe(2)
  })

  it('The onDeleteFormLine should delete the item by path', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions(stateResult.current.setFormStates))
    act(() => {
      actionsResult.current.onDeleteFormLine([0])
    })
    expect(stateResult.current.formStates.length).toEqual(1)
  })

  it('The onDeleteFormLine should delete the children item by path', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions(stateResult.current.setFormStates))
    act(() => {
      actionsResult.current.onDeleteFormLine([0, 0])
    })
    expect(stateResult.current.formStates[0].children.length).toEqual(0)
  })

  it('The onAddChildren should add the children item by path', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions(stateResult.current.setFormStates))
    act(() => {
      actionsResult.current.onAddChildren([0])
    })
    expect(stateResult.current.formStates[0].children.length).toEqual(2)
  })

  it('The onAddChildren should add the children item by path', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions(stateResult.current.setFormStates))
    act(() => {
      actionsResult.current.onStateChange([1], 'type', ETypes.String)
    })
    expect(stateResult.current.formStates[1].type).toEqual(ETypes.String)
  })

  it('The onAddChildren should add the children item by path', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions(stateResult.current.setFormStates))
    act(() => {
      actionsResult.current.onStateChange([0, 0], 'value', "kill alen twice")
    })
    expect(stateResult.current.formStates[0].children[0].value).toEqual("kill alen twice")
  })

  it('when the type change to "object" or "array", the current item"s value should be empty', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions(stateResult.current.setFormStates))
    act(() => {
      actionsResult.current.onStateChange([1], 'type', ETypes.Array)
    })
    expect(stateResult.current.formStates[1].type).toEqual(ETypes.Array)
    expect(stateResult.current.formStates[1].value).toEqual("")
  })

})
