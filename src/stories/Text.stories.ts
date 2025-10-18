import type { Meta, StoryObj } from '@storybook/react';
import Text from '../components/Text/Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['normal', 'bold', 'large'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    children: '通常のテキストです',
    variant: 'normal',
  },
};

export const Bold: Story = {
  args: {
    children: '太字のテキストです',
    variant: 'bold',
  },
};

export const Large: Story = {
  args: {
    children: '大きなテキストです',
    variant: 'large',
  },
};

export const Score: Story = {
  args: {
    children: 'スコア: 1500',
    variant: 'bold',
  },
};

export const Lives: Story = {
  args: {
    children: '残機: 3',
    variant: 'bold',
  },
};