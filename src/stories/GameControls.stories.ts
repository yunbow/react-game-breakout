import type { Meta, StoryObj } from '@storybook/react';
import GameControls from '../features/breakout-game/components/GameControls/GameControls';

const meta = {
  title: 'Features/BreakoutGame/GameControls',
  component: GameControls,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onButtonClick: { action: 'button clicked' },
    score: {
      control: { type: 'number', min: 0, max: 10000, step: 10 },
    },
    lives: {
      control: { type: 'number', min: 0, max: 5, step: 1 },
    },
  },
} satisfies Meta<typeof GameControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Start: Story = {
  args: {
    score: 0,
    lives: 3,
    buttonText: 'スタート',
  },
};

export const Pause: Story = {
  args: {
    score: 1500,
    lives: 2,
    buttonText: 'ポーズ',
  },
};

export const Resume: Story = {
  args: {
    score: 2350,
    lives: 1,
    buttonText: '再開',
  },
};

export const GameOver: Story = {
  args: {
    score: 3200,
    lives: 0,
    buttonText: 'もう一度',
  },
};