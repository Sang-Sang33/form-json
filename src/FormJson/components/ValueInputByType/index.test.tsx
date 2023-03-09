import { useFormStates } from '../../../../test/test-utils';
import { act, renderHook } from '@testing-library/react';
import useFormActions from '../../common/hooks/useFormActions';
import { screen, render, fireEvent } from '@testing-library/react';
import ValueInputByType from "./index";
import React from 'react';
import { pick } from 'lodash-es';
import { vitest } from "vitest";

describe('Component ValueInputByType', () => {
  it('The ValueInputByType should render when the type is "number", and onChange with the int value', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    const props = pick(stateResult.current.formStates[1], ['type', 'value', 'id']);
    const ValueInput = render(<ValueInputByType
        {...props}
        path={[1]}
        handleStateChange={actionsResult.current.handleStateChange}
    />)
    const input = screen.getByPlaceholderText("请输入值")
    fireEvent.change(input, {target: {value: '23'}})
    expect(ValueInput.container).toBeInTheDocument()
    expect(stateResult.current.formStates[1].value).toBe(23)
  })

  it('The ValueInputByType should render when the number is "string", and onChange with the int value', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    const props = pick(stateResult.current.formStates[0].children[0], ['type', 'value', 'id']);
    const ValueInput = render(
      <ValueInputByType
        {...props}
        path={[0,0]}
        handleStateChange={actionsResult.current.handleStateChange}
      />)
    const input = screen.getByTestId(`line-${props.id}-value`)
    fireEvent.change(input, {target: {value: 'kill alen twice'}})
    expect(ValueInput.container).toBeInTheDocument()
    expect(stateResult.current.formStates[0].children[0].value).toBe('kill alen twice')
  })

  it('The ValueInputByType should render when the type is "boolean", and onChange with the int value', async () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    const props = pick(stateResult.current.formStates[2], ['type', 'value', 'id']);
    const ValueInput = render(<ValueInputByType
        {...props}
        path={[2]}
        handleStateChange={actionsResult.current.handleStateChange}
    />)
    const selectEle = ValueInput.container.querySelector('.ant-select-selector')!
    await act(async () => {
      await fireEvent.mouseDown(selectEle);
      vitest.useFakeTimers();
    })
    const options = document.querySelectorAll('.ant-select-item-option')
    expect(ValueInput.container).toBeInTheDocument()
    expect(selectEle).toBeInTheDocument();
    expect(options.length).toBe(2);
    expect(options[0].title!).toBe('true')
  })

  it('The ValueInputByType should render when the type is "boolean", and onChange with the int value', async () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    const props = pick(stateResult.current.formStates[2], ['type', 'value', 'id']);
    const onSelectChange = vitest.fn();
    const ValueInput = render(<ValueInputByType
        {...props}
        path={[2]}
        handleStateChange={(...args) => {
          onSelectChange();
          actionsResult.current.handleStateChange(...args);
        }}
    />)
    const selectEle = ValueInput.container.querySelector('.ant-select-selector')!
    await act(async () => {
      await fireEvent.mouseDown(selectEle);
      vitest.useFakeTimers();
    })
    const options = document.querySelectorAll('.ant-select-item-option')
    await act(async () => {
      await fireEvent.click(options[0]);
      vitest.useFakeTimers();
    })
    expect(ValueInput.container).toBeInTheDocument()
    expect(selectEle).toBeInTheDocument();
    expect(onSelectChange).toHaveBeenCalled()
    expect(stateResult.current.formStates[2].value).toBeTruthy()
  })

  it('The ValueInputByType should be disabled when the type is "object" or "array"', async () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    const props = pick(stateResult.current.formStates[0], ['type', 'value', 'id']);
    const ValueInput = render(<ValueInputByType
        {...props}
        path={[0]}
        handleStateChange={actionsResult.current.handleStateChange}
    />)
    const input = screen.getByTestId(`line-${props.id}-value`)
    expect(ValueInput.container).toBeInTheDocument()
    expect(input.disabled).toBeTruthy();
  })
})
