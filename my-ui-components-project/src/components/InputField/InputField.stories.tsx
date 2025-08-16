import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';

// Meta data for the story
const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    // Define argTypes for props with descriptions and controls
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
      description: 'The visual style of the input field.',
    },
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input field.',
    },
    invalid: {
      control: 'boolean',
      description: 'Sets the input field to an invalid state.',
    },
    disabled: {
      control: 'boolean',
      description: 'Sets the input field to a disabled state.',
    },
    errorMessage: {
      control: 'text',
      description: 'The error message to display when the field is invalid.',
    },
    label: {
      control: 'text',
      description: 'The label for the input field.',
    },
  },
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

// Stories for different states and variants
export const Default: Story = {
  args: {},
};

export const InvalidState: Story = {
  args: {
    invalid: true,
    errorMessage: 'Please enter a valid email address.',
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
  },
};

export const FilledVariant: Story = {
  args: {
    variant: 'filled',
  },
};

export const SmallSize: Story = {
  args: {
    inputSize: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    inputSize: 'lg',
  },
};

export const GhostVariant: Story = {
  args: {
    variant: 'ghost',
  },
};
