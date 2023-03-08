import { useState } from 'react';
import { IFormItem } from '../src/FormJson/common/constants/type';
import { ETypes } from '../src/FormJson/common/constants';
import { uniqueId } from 'lodash-es';

export function useFormStates() {
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
    {
      name: 'isHumanbeings',
      value: false,
      id: uniqueId(),
      type: ETypes.Boolean,
      children: [],
    },
  ]);

  return {
    formStates,
    setFormStates,
  };
}
