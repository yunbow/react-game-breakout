import type { Meta, StoryObj } from '@storybook/react';
import BreakoutGameApp from '../features/breakout-game/BreakoutGameApp';

const meta = {
  title: 'Features/BreakoutGame/BreakoutGameApp',
  component: BreakoutGameApp,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BreakoutGameApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};