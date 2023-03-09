import { useFormStates } from '../../test/test-utils';
import { renderHook } from '@testing-library/react';
import { screen, render } from '@testing-library/react';
import React from 'react';
import FormJson from './index';

describe("Component FormJson", () => {
  it("should be renderred", () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const {container} = render(<FormJson {...stateResult.current}/>)
    expect(container).toBeInTheDocument()
  })
  it("The intent should be correct", () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const {container} = render(<FormJson {...stateResult.current} indent={18} />)
    const lines = container.querySelectorAll('.ant-row')
    const padding = lines[0].style.padding;
    const input = screen.getByTestId(`line-${stateResult.current.formStates[0].children[0].id}-key`)
    const indent = input.parentNode.style.paddingLeft
    expect(container).toBeInTheDocument()
    expect(lines.length).toBe(4)
    expect(padding).toBe('8px 0px')
    expect(indent).toBe('18px')
  })

  it("The intent should be correct", () => {
    const { result: stateResult } = renderHook(() => useFormStates())
    const {container} = render(<FormJson {...stateResult.current} indent={18} />)
    const lines = container.querySelectorAll('.ant-row')
    const deleteBtn = screen.getByTestId(`line-${stateResult.current.formStates[0].id}-delete`)
    const valueInput = screen.getByTestId(`line-${stateResult.current.formStates[0].id}-value`)
    expect(lines.length).toBe(4)
    expect(deleteBtn.disabled).toBe(true)
    expect(valueInput.disabled).toBe(true)
  })
})
