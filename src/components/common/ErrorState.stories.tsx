import type { Meta, StoryObj } from '@storybook/react-vite';
import ErrorState from './ErrorState';

const meta: Meta<typeof ErrorState> = {
  title: 'Common/ErrorState',
  component: ErrorState,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {
  args: { onRetry: () => console.warn('retry clicked') },
};
