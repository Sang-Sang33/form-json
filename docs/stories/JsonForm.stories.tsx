import { JsonFormStory, useFormStates } from './JsonForm';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { IJsonFormProps } from '../../lib/es/type';

export default {
  title: 'Example/JsonForm',
  component: JsonFormStory,
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
    }
  }
} as ComponentMeta<typeof JsonFormStory>;

const Template: ComponentStory<typeof JsonFormStory> = (args: Omit<IJsonFormProps, 'setFormStates' | 'formStates'>) => {
  const stateProps = useFormStates();
  return <JsonFormStory {...stateProps} {...args}  />
};

export const Normal = Template.bind({});
Normal.args = {
}

export const Indent = Template.bind({});
Indent.args = {
  indent: 20
};

export const Spans = Template.bind({});
Spans.args = {
  spans: [6,6,6,6]
};
