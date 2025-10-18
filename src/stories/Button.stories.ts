import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/Button/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ボタン',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    children: 'ボタン',
    disabled: true,
  },
};

export const StartButton: Story = {
  args: {
    children: 'スタート',
    disabled: false,
  },
};

export const PauseButton: Story = {
  args: {
    children: 'ポーズ',
    disabled: false,
  },
};