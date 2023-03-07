import { BOOLEAN_OPTIONS, ETypes } from '../../common/constants';
import { Input, InputNumber, Select } from 'antd';
import { OnStateChange } from '../../common/constants/type';
import { has } from 'lodash-es';
import React from 'react';

interface IProps {
  value: string | boolean | number;
  type: string;
  path: number[];
  onStateChange: OnStateChange;
}

function ValueInputByType({ value, path, type, onStateChange }: IProps) {
  const VALUE_COMPONENTS = {
    [ETypes.Boolean]: (
        <Select
            value={value}
            style={{ width: '100%' }}
            options={BOOLEAN_OPTIONS}
            onChange={(value) => {
              onStateChange(path, 'value', value);
            }}
            placeholder={'请选择true或者false'}
        />
    ),
    [ETypes.String]: (
        <Input
            value={value as string}
            placeholder={'请输入值'}
            onChange={(e) => {
              onStateChange(path, 'value', e.target.value);
            }}
        />
    ),
    [ETypes.Number]: (
        <InputNumber
            value={value as number}
            style={{ width: '100%' }}
            controls={false}
            placeholder={'请输入值'}
            onChange={(value) => {
              onStateChange(path, 'value', value as number);
            }}
        />
    ),
  };
  if (has(VALUE_COMPONENTS, type)) {
    const component = VALUE_COMPONENTS[type as keyof typeof VALUE_COMPONENTS];
    return component;
  }
  return <Input disabled />;
}

export default ValueInputByType;
