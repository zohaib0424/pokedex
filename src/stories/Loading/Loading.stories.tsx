import type { Meta, StoryObj } from '@storybook/react';
import { Loading } from '../../components/feature/Loading';

const meta = {
  title: 'Feature/Loading',
  component: Loading,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithBackButton: Story = {
  args: {
    onBackClick: () => alert('Back button clicked!'),
  },
};

