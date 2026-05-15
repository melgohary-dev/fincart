import type { Meta, StoryObj } from '@storybook/react-vite';
import SummarySidebar from './SummarySidebar';
import { useQuoteStore } from '@/store/quoteStore';
import { useEffect } from 'react';

const meta: Meta<typeof SummarySidebar> = {
  title: 'Sidebar/SummarySidebar',
  component: SummarySidebar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      useEffect(() => {
        return () => useQuoteStore.getState().reset();
      }, []);
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof SummarySidebar>;

export const Empty: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        useQuoteStore.getState().reset();
      }, []);
      return <Story />;
    },
  ],
};

export const WithData: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        const store = useQuoteStore.getState();
        store.setOrigin('US');
        store.setDestination('DE');
        store.setWeight(5);
        store.setVolume(0.5);
      }, []);
      return <Story />;
    },
  ],
};
