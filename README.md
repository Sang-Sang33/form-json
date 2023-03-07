<h1 align="center">Json Form</h1>

<p align="center">Generate Json data with the controlled form based on "antd"、“lodash-es”、"immer"</p>

## Install

```bash
npm install json-form
```

```bash
yarn add json-form
```

![image](https://github.com/Sang-Sang33/Json-Form/blob/main/assets/review.png)

## Usage

```tsx
import { useState } from 'react';
import { JsonForm } from 'json-form';
import type { IFormItem, ETypes } from 'json-form';

const App = () => {
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
      name: 'isAlenSb',
      value: true,
      id: '3',
      type: ETypes.Boolean,
      children: [],
    },
  ]);
  return (
    <div>
      <JsonForm formStates={formStates} setFormStates={setFormStates} />
    </div>
  )
}
```

## API

| Property | Description | Type | Default | Required |
| --- | --- | --- | --- | --- |
| formStates | The initial state | IFormItem[] |  | ✅ |
| setFormStates | Dispatch actions | Dispatch<SetStateAction<IFormItem[]>> |  | ✅ |
| indent | Indent size in pixels of tree data | number | 16 |  |
| spans | The span of grid between each element for every line | number[] | [8,5,8,3] |  |

### IFormItem

| Field | Description | Type |
| --- | --- | --- | 
| name | The Json field | string | 
| value | The value to the current key | any | 
| id | The unique key for each line | string | 
| type | The type for value | ETypes
| children | The nested children | IFormItem[]

### ETypes
```ts
enum ETypes {
  String = 'string',
  Number = 'number',
  Array = 'array',
  Object = 'object',
  Boolean = 'boolean',
}
```

## Hooks

### useJsonStates
```ts
type useJsonStates = (formStates: IFormItem[]) => Object
```

return the memorized json object from formStates.

### usage
```tsx
import { useState } from 'react';
import { JsonForm, useJsonStates } from 'json-form';
import type { IFormItem, ETypes } from 'json-form';

const App = () => {
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
      name: 'isAlenSb',
      value: true,
      id: '3',
      type: ETypes.Boolean,
      children: [],
    },
  ]);
  const jsonState = useJsonStates(formStates);
  /**
   * current jsonState:
   * {
   *   mikasa: {
   *     name: "Ackerman",
   *     height: 170,
   *     hobby: ["kill Alen"]
   *   },
   *   isAlenSb: true
   * }
   * */
  return (
    <div>
      <JsonForm formStates={formStates} setFormStates={setFormStates} />
    </div>
  )
}
```

### useFormActions
```ts
type TEditField = Exclude<keyof IFormItem, 'id' | 'children' | 'path'>;
type useFormActions = (formStates: IFormItem[]) => ({
  onAddChildren: (path: number[]) => void;
  onDeleteFormLine: (path: number[]) => void;
  onAddSibling: (path: number[]) => void;
  onStateChange: (path: number[], field: TEditField, value: string | number | boolean) => void;;
})
```
The CURD actions for the form which has already been add event to the form element, maybe you should use it in other place.
