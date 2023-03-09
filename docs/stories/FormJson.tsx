import { useState } from 'react';
import { ETypes, IFormItem } from '../../src';


export function useFormStates() {
  const [formStates, setFormStates] = useState<IFormItem[]>([
    {
      name: 'mikasa',
      value: '',
      id: '1',
      type: ETypes.Object,
      children: [
        {
          name: 'name',
          value: 'Ackerman',
          id: '2',
          type: ETypes.String,
          children: [],
        },
        {
          name: 'height',
          value: 170,
          id: '4',
          type: ETypes.Number,
          children: [],
        },
        {
          name: 'hobby',
          value: 170,
          id: '5',
          type: ETypes.Array,
          children: [
            {
              name: '',
              value: 'kill Alen',
              id: '6',
              type: ETypes.String,
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: 'Alen',
      value: '',
      id: '3',
      type: ETypes.Object,
      children: [
        {
          name: 'isDead',
          value: true,
          id: '3',
          type: ETypes.Boolean,
          children: [

          ],
        },
      ],
    },
  ]);

  return {
    formStates,
    setFormStates,
  };
}



