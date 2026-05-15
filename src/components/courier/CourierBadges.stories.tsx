import type { Meta, StoryObj } from '@storybook/react-vite';
import CourierBadges from './CourierBadges';

const meta: Meta<typeof CourierBadges> = {
  title: 'Courier/CourierBadges',
  component: CourierBadges,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    isCheapest: { control: 'boolean' },
    isFastest: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CourierBadges>;

export const CheapestOnly: Story = {
  args: { isCheapest: true, isFastest: false },
};

export const FastestOnly: Story = {
  args: { isCheapest: false, isFastest: true },
};

export const Both: Story = {
  args: { isCheapest: true, isFastest: true },
};

export const None: Story = {
  args: { isCheapest: false, isFastest: false },
};
