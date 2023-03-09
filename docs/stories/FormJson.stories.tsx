import {  useFormStates } from './FormJson';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { IFormJsonProps, FormJson, useJsonStates } from '../../src';
import { Input } from 'antd';

export default {
  title: 'Example/FormJson',
  component: FormJson,
  argTypes: {
    spans: {
      control: {
        type: 'array'
      },
      defaultValue: [8,5,8,3],
      description: "The span of grid between each element for every line."
    },
    indent: {
      control: {
        type: 'number',
      },
      defaultValue: 16,
      description: "Indent size in pixels of tree data."
    },
    containerClassName: {
      control: {
        type: 'string',
      },
      description: "The container class."
    },
    itemClassName: {
      control: {
        type: 'string',
      },
      description: "The class for each line's container."
    },
    formStates: {
      control: false,
      description: "The mutable state which has been controlled to the input form's value."
    },
    setFormStates: {
      control: false,
      description: "The setState for formStates."
    },
    onAddChildren: {
      action: 'clicked',
      control: false,
      description: "A callback function, can be executed when clicking to the plus children icon."
    },
    onAddSibling: {
      action: 'clicked',
      control: false,
      description: "A callback function, can be executed when clicking to the plus icon."
    },
    onDeleteItem: {
      action: 'clicked',
      control: false,
      description: "A callback function, can be executed when clicking to the delete icon."
    },
    onStateChange: {
      action: 'onChange',
      control: false,
      description: "A callback function, can be executed when the input element's value has been changed."
    }
  }
} as ComponentMeta<typeof FormJson>;

const Template: ComponentStory<typeof FormJson> = (args: Omit<IFormJsonProps, 'setFormStates' | 'formStates'>) => {
  const stateProps = useFormStates();
  const jsonStates = useJsonStates(stateProps.formStates)
  return <div style={{display: 'flex'}}>
    <div style={{width: '70%'}}>
      <FormJson {...stateProps} {...args} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', width: '30%', backgroundColor: '#f6f7f8', padding: 16 }}>
      <h3 style={{margin: 0, padding: 0}}>
        The Json Result by the hook of useJsonStates
      </h3>
      <Input.TextArea 
        bordered={false} 
        style={{flex: 1, color: 'rgba(0, 0, 0, 0.88)', fontWeight: 500, resize: 'none'}} 
        value={JSON.stringify(jsonStates, null, 4)} 
        disabled 
      />
    </div>
  </div>
};

const callbacksArgs = () => ({
  onAddChildren: path => {console.log("path", path)},
  onAddSibling: path => {console.log("path", path)},
  onDeleteItem: path => {console.log("path", path)},
  onStateChange: (path: number[], field: any, value: string | number | boolean) => {
    console.log("path", path)
    console.log("field", field)
    console.log("value", value)
  },
})

export const Normal = Template.bind({});
Normal.args = {
  ...callbacksArgs
}

export const Indent = Template.bind({});
Indent.args = {
  indent: 20,
  ...callbacksArgs
};

export const Spans = Template.bind({});
Spans.args = {
  spans: [6,6,6,6],
  ...callbacksArgs
};

