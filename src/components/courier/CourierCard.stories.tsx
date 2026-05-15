import type { Meta, StoryObj } from '@storybook/react-vite';
import CourierCard from './CourierCard';
import type { CourierWithMeta } from '@/types';

const baseCourier: CourierWithMeta = {
  id: 'dhl',
  name: 'DHL Express',
  logoUrl: 'https://logo.clearbit.com/dhl.com',
  basePrice: 45.0,
  taxRate: 0.08,
  deliveryDays: [3, 5],
  totalPrice: 48.6,
  tax: 3.6,
  weightCharge: 45.0,
  isCheapest: false,
  isFastest: false,
};

const meta: Meta<typeof CourierCard> = {
  title: 'Courier/CourierCard',
  component: CourierCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    courier: { control: 'object' },
    weightKg: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof CourierCard>;

export const Standard: Story = {
  args: { courier: baseCourier, weightKg: 1 },
};

export const Cheapest: Story = {
  args: {
    courier: { ...baseCourier, isCheapest: true, isFastest: false },
    weightKg: 1,
  },
};

export const Fastest: Story = {
  args: {
    courier: { ...baseCourier, isCheapest: false, isFastest: true },
    weightKg: 1,
  },
};

export const BothBadges: Story = {
  args: {
    courier: { ...baseCourier, isCheapest: true, isFastest: true },
    weightKg: 1,
  },
};

export const HeavyPackage: Story = {
  args: {
    courier: {
      ...baseCourier,
      basePrice: 100,
      weightCharge: 200,
      totalPrice: 220,
      tax: 20,
      taxRate: 0.1,
    },
    weightKg: 2,
  },
};
