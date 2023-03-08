import { FormJsonStory, useFormStates,  } from './FormJson';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { IFormJsonProps } from '../../src/index';

export default {
  title: 'Example/FormJson',
  component: FormJsonStory,
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
} as ComponentMeta<typeof FormJsonStory>;

const Template: ComponentStory<typeof FormJsonStory> = (args: Omit<IFormJsonProps, 'setFormStates' | 'formStates'>) => {
  const stateProps = useFormStates();
  return <FormJsonStory {...stateProps} {...args}  />
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

