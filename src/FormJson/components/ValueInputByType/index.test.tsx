import { useFormStates } from '../../../../test/test-utils';
import { renderHook } from '@testing-library/react';
import useFormActions from '../../common/hooks/useFormActions';
import { screen, render, fireEvent } from '@testing-library/react';
import ValueInputByType from "./index";
import React from 'react';

describe('useJsonState', () => {
  it('The ValueInputByType should render when the type is "number", and onChange with the int value', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    const ValueInput = render(<ValueInputByType
        value={stateResult.current.formStates[1].value}
        type={stateResult.current.formStates[1].type}
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
    const ValueInput = render(
      <ValueInputByType
        value={stateResult.current.formStates[0].children[0].value}
        type={stateResult.current.formStates[0].children[0].type}
        path={[0,0]}
        handleStateChange={actionsResult.current.handleStateChange}
      />)
    const input = screen.getByPlaceholderText("请输入值")
    fireEvent.change(input, {target: {value: 'kill alen twice'}})
    expect(ValueInput.container).toBeInTheDocument()
    expect(stateResult.current.formStates[0].children[0].value).toBe('kill alen twice')
  })

  it('The ValueInputByType should render when the type is "boolean", and onChange with the int value', () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const { result: actionsResult } = renderHook(() => useFormActions({setFormStates: stateResult.current.setFormStates}))
    const ValueInput = render(<ValueInputByType
        value={stateResult.current.formStates[2].value}
        type={stateResult.current.formStates[2].type}
        path={[2]}
        handleStateChange={actionsResult.current.handleStateChange}
    />)
    const input = screen.getByText(String(stateResult.current.formStates[2].value))
    expect(ValueInput.container).toBeInTheDocument()
    expect(input).toBeInTheDocument();
  })
})
