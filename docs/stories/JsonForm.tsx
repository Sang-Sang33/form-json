import { JsonForm, IJsonFormProps, useJsonStates } from '../../src/index';
import { useState } from 'react';
import { ETypes, IFormItem } from '../../src';
import React from 'react';
import { Input } from 'antd';

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

type IProps = IJsonFormProps

export const JsonFormStory = (props: IProps) => {
  const jsonStates = useJsonStates(props.formStates);
  return <div style={{display: 'flex'}}>
    <div style={{width: '70%'}}>
      <JsonForm {...props} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', width: '30%', backgroundColor: '#f6f7f8', padding: 16 }}>
      <h3 style={{margin: 0, padding: 0}}>
        The Json Result by the hook of useJsonStates
      </h3>
      <Input.TextArea bordered={false} style={{flex: 1, color: 'rgba(0, 0, 0, 0.88)', fontWeight: 500, resize: 'none'}} value={JSON.stringify(jsonStates, null, 4)} disabled />
    </div>
  </div>
}


