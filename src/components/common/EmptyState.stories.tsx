import type { Meta, StoryObj } from '@storybook/react-vite';
import EmptyState from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Common/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};
