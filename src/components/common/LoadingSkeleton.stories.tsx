import type { Meta, StoryObj } from '@storybook/react-vite';
import LoadingSkeleton from './LoadingSkeleton';

const meta: Meta<typeof LoadingSkeleton> = {
  title: 'Common/LoadingSkeleton',
  component: LoadingSkeleton,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoadingSkeleton>;

export const Default: Story = {};
