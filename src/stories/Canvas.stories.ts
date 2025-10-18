import type { Meta, StoryObj } from '@storybook/react';
import Canvas from '../components/Canvas/Canvas';

const meta = {
  title: 'Components/Canvas',
  component: Canvas,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'number', min: 100, max: 1000, step: 50 },
    },
    height: {
      control: { type: 'number', min: 100, max: 800, step: 50 },
    },
  },
} satisfies Meta<typeof Canvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 400,
    height: 300,
    onCanvasReady: (_canvas, ctx) => {
      ctx.fillStyle = '#0095DD';
      ctx.fillText('Canvas is ready!', 50, 50);
    },
  },
};

export const GameSize: Story = {
  args: {
    width: 800,
    height: 600,
    onCanvasReady: (_canvas, ctx) => {
      ctx.fillStyle = '#0095DD';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Game Canvas (800x600)', 400, 300);
    },
  },
};