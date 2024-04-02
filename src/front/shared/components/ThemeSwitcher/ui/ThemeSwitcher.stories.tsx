import type { Meta, StoryObj } from '@storybook/react';

import { expect, within } from '@storybook/test';
import { ThemeProvider } from 'next-themes';
import 'src/app/styles/globals.css';
import { ThemeToggle } from './ThemeSwitcher';

const meta = {
    title: 'Components/ThemeSwitcher',
    component: ThemeToggle,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className='flex size-8 items-center justify-center rounded-md bg-[hsl(var(--background))]'>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='light'
                    enableSystem
                    enableColorScheme
                    disableTransitionOnChange
                >
                    <Story />
                </ThemeProvider>
            </div>
        ),
    ],
} satisfies Meta<typeof ThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    play: async ({ args, step, canvasElement }) => {
        const canvas = within(canvasElement);
        console.log(canvasElement);
        console.log(canvas.queryByTestId('theme-switcher'));
        await step('switch theme to dark', async () => {
            (await canvas.findByTestId('theme-switcher')).click();
        });

        expect(document.documentElement).toHaveClass('dark');
        await step('switch theme to system', async () => {
            canvas.queryByTestId('theme-switcher')?.click();
        });

        expect(document.documentElement).toHaveClass('dark');
        await step('switch theme to light', async () => {
            canvas.queryByTestId('theme-switcher')?.click();
        });

        expect(document.documentElement).toHaveClass('light');
    },
};
