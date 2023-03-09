import { useFormStates } from '../../../../test/test-utils';
import { act, renderHook } from '@testing-library/react';
import useFormActions from '../../common/hooks/useFormActions';
import { screen, render, fireEvent } from '@testing-library/react';
import React from 'react';
import { omit } from "lodash-es";
import { vitest } from "vitest";
import FormLine from './index';

describe('Component FormLine', () => {
  it("should be renderred by props", () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    const { container } = render(<FormLine
      {...stateResult.current.formStates[0]}
      {...actionsResult.current}
      path={[0]}
      parentType=""
      isDeleteDisabled={true}
    />)
    expect(container).toBeInTheDocument();
  })
  it("The CURD actions should be called.", async () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    const state = stateResult.current.formStates[1]
    const onChange = vitest.fn();
    const { container } = render(<FormLine
      {...state}
      {...omit(actionsResult.current, ['handleStateChange'])}
      handleStateChange={(...args) => {
        onChange();
          actionsResult.current.handleStateChange(...args)
        }
      }
      path={[1]}
      parentType=""
      isDeleteDisabled={true}
    />)
    const input = screen.getByTestId(`line-${state.id}-key`)
    fireEvent.change(input, { target: { value: 'mikasa-haha' } })

    const typeSelect = screen.getByTestId(`line-${state.id}-type`).querySelector('.ant-select-selector')!;
    await act(async () => {
      await fireEvent.mouseDown(typeSelect);
      vitest.useFakeTimers();
    })
    const options = document.querySelectorAll('.ant-select-item-option')
    await act(async () => {
      await fireEvent.click(options[0]);
      vitest.useFakeTimers();
    })
    expect(container).toBeInTheDocument();
    expect(onChange).toHaveBeenNthCalledWith(2)
    expect(stateResult.current.formStates[1].name).toBe('mikasa-haha')
    expect(stateResult.current.formStates[1].type).toBe('string')
    expect(options.length).toBe(5)
  })

  it("The add actions should be called.", async () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    const state = stateResult.current.formStates[1]
    const onAddSibling = vitest.fn();
    const { container } = render(<FormLine
      {...state}
      {...omit(actionsResult.current, ['handleAddSibling'])}
      handleAddSibling={(...args) => {
        onAddSibling();
        actionsResult.current.handleAddSibling(...args)
      }}
      path={[1]}
      parentType=""
      isDeleteDisabled={true}
    />)

    const addButton = screen.getByTestId(`line-${state.id}-add`)
    fireEvent.click(addButton)
    expect(container).toBeInTheDocument()
    expect(addButton).toBeInTheDocument()
    expect(onAddSibling).toHaveBeenCalled()
    expect(stateResult.current.formStates.length).toBe(4)
  })

  it("The delete actions should be called.", async () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    const state = stateResult.current.formStates[1]
    const onDeleteItem = vitest.fn();
    const { container } = render(<FormLine
      {...state}
      {...omit(actionsResult.current, ['handleDeleteItem'])}
      handleDeleteItem={(...args) => {
        onDeleteItem();
        actionsResult.current.handleDeleteItem(...args)
      }}
      path={[1]}
      parentType=""
      isDeleteDisabled={false}
    />)

    const addButton = screen.getByTestId(`line-${state.id}-delete`)
    fireEvent.click(addButton)
    expect(container).toBeInTheDocument()
    expect(addButton).toBeInTheDocument()
    expect(onDeleteItem).toHaveBeenCalled()
    expect(stateResult.current.formStates.length).toBe(2)
  })

  it("The add actions should change when the type is 'object' or 'array'.", async () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    const state = stateResult.current.formStates[0]
    const onAddSibling = vitest.fn();
    const { container } = render(<FormLine
      {...state}
      {...omit(actionsResult.current, ['handleAddSibling'])}
      handleAddSibling={(...args) => {
        onAddSibling();
        actionsResult.current.handleAddSibling(...args)
      }}
      path={[0]}
      parentType=""
      isDeleteDisabled={true}
    />)
    const addButton = screen.getByTestId(`line-${state.id}-menu-children`)
    expect(addButton).toBeInTheDocument()
    expect(container).toBeInTheDocument()
  })
})
