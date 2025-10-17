import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Input } from 'components';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The input value',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    onChange: {
      action: 'changed',
      description: 'Called when input value changes',
    },
    onKeyDown: {
      action: 'keyDown',
      description: 'Called when a key is pressed',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class',
    },
    'data-testid': {
      control: 'text',
      description: 'Test identifier',
    },
  },
  args: {
    onChange: fn(),
    onKeyDown: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Hello World',
    placeholder: 'Enter text...',
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    value: '',
    placeholder: 'Search for Pokemon...',
  },
};

export const WithCustomClass: Story = {
  args: {
    value: '',
    placeholder: 'Custom styled input',
    className: 'custom-input',
  },
};

export const WithTestId: Story = {
  args: {
    value: '',
    placeholder: 'Input with test ID',
    'data-testid': 'storybook-input',
  },
};

export const AllVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input
        value=""
        onChange={fn()}
        placeholder="Default input"
      />
      <Input
        value="Pre-filled value"
        onChange={fn()}
        placeholder="With value"
      />
      <Input
        value=""
        onChange={fn()}
        placeholder="Search Pokemon..."
        className="custom-class"
      />
    </div>
  ),
};
