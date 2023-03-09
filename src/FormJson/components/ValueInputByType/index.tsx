import { BOOLEAN_OPTIONS, ETypes } from '../../common/constants';
import { Input, InputNumber, Select } from 'antd';
import { OnStateChange } from '../../common/constants/type';
import { has } from 'lodash-es';
import React from 'react';

interface IProps {
  value: string | boolean | number;
  id: string;
  type: string;
  path: number[];
  handleStateChange: OnStateChange;
}

function ValueInputByType({ value, path, type, id, handleStateChange }: IProps) {
  const VALUE_COMPONENTS = {
    [ETypes.Boolean]: (
        <Select
            data-testid={`line-${id}-value`}
            value={value}
            style={{ width: '100%' }}
            options={BOOLEAN_OPTIONS}
            onChange={(value) => {
              handleStateChange(path, 'value', value);
            }}
            placeholder={'请选择true或者false'}
        />
    ),
    [ETypes.String]: (
        <Input
            data-testid={`line-${id}-value`}
            value={value as string}
            placeholder={'请输入值'}
            onChange={(e) => {
              handleStateChange(path, 'value', e.target.value);
            }}
        />
    ),
    [ETypes.Number]: (
        <InputNumber
            data-testid={`line-${id}-value`}
            value={value as number}
            style={{ width: '100%' }}
            controls={false}
            placeholder={'请输入值'}
            onChange={(value) => {
              handleStateChange(path, 'value', value as number);
            }}
        />
    ),
  };
  if (has(VALUE_COMPONENTS, type)) {
    const component = VALUE_COMPONENTS[type as keyof typeof VALUE_COMPONENTS];
    return component;
  }
  return <Input disabled data-testid={`line-${id}-value`} />;
}

export default ValueInputByType;
