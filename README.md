<h1 align="center">Antd Form Json</h1>

<p align="center">Generate Json data with the controlled form based on "antd"、“lodash-es”、"immer"</p>

## Install

```bash
npm install antd-form-json
```

```bash
yarn add antd-form-json
```

### [**antd-form-json-Storybook**](https://sang-sang33.github.io)

## Usage

```tsx
import { useState } from 'react';
import { FormJson } from 'antd-form-json';
import type { IFormItem, ETypes } from 'antd-form-json';

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
      <FormJson formStates={formStates} setFormStates={setFormStates} />
    </div>
  )
}
```

## API

| Property | Description | Type | Default | Required |
| --- | --- | --- | --- | --- |
| formStates | The initial state | [IFormItem[]](#IFormItem) |  | ✅ |
| setFormStates | Dispatch actions | Dispatch"<"SetStateAction"<"IFormItem[]">"">" |  | ✅ |
| indent | Indent size in pixels of tree data | number | 16 |  |
| spans | The span of grid between each element for every line | number[] | [8,5,8,3] |  |
| containerClassName | The container class | string | |  |
| itemClassName | The class for each line's container | string | |  |
| onAddChildren | A callback function, can be executed when clicking to the plus children icon | [OnStateCurd](#OnStateCurd) | |  |
| onAddSibling | A callback function, can be executed when clicking to the plus icon | [OnStateCurd](#OnStateCurd) | |  |
| onDeleteItem | A callback function, can be executed when clicking to the delete icon | [OnStateCurd](#OnStateCurd) | |  |
| onStateChange | A callback function, can be executed when the input element's value has been changed | [OnStateChange](#OnStateChange) | |  |

## Hooks

### useJsonStates
```ts
type useJsonStates = (formStates: IFormItem[]) => Object
```

return the memorized json object from formStates.

### usage
```tsx
import { useState } from 'react';
import { FormJson, useJsonStates } from 'antd-form-json';
import type { IFormItem, ETypes } from 'antd-form-json';

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
      <FormJson formStates={formStates} setFormStates={setFormStates} />
    </div>
  )
}
```

### useFormActions
```ts
type useFormActions = (props: IFormActions) => ReturnFormACtions
```
The CURD actions for the form which has already been binded to the form element event, maybe you could use it in other place.


## Interface

### <a id="IFormItem">IFormItem</a>
```ts
interface IFormItem {
  name: string;                     // The Json Key
  value: string | number | boolean; // The value to the current json key
  id: string;                       // The unique key for each line
  type: string;                     // ETypes
  children: IFormItem[];            // The nested children when the type is 'array' or 'object'
}
```

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

### TEditField
```ts
type TEditField = Exclude<keyof IFormItem, 'id' | 'children' | 'path'>;
```

### IFormActions
```ts
interface IFormActions extends ICallbacks {
  setFormStates: Dispatch<SetStateAction<IFormItem[]>>;
}
```

### ICallbacks
```ts
interface ICallbacks {
  onAddChildren?: OnStateCurd;
  onAddSibling?: OnStateCurd;
  onDeleteItem?: OnStateCurd;
  onStateChange?: OnStateChange;
}
```

### <a id="OnStateCurd">OnStateCurd</a>
```ts
type OnStateCurd = (path: number[]) => void;
```

### <a id="OnStateChange">OnStateChange</a>
```ts 
type OnStateChange = (path: number[], field: TEditField, value: string | number | boolean) => void;
```

