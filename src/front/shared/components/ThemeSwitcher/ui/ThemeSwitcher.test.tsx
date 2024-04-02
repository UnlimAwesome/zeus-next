import { ThemeToggle } from '@/components/ThemeSwitcher/ui/ThemeSwitcher';
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'next-themes';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe('ThemeSwitcher', () => {
    beforeEach(() => {
        render(
            <div className='flex size-8 items-center justify-center rounded-md bg-[hsl(var(--background))]'>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='light'
                    enableSystem
                    enableColorScheme
                    disableTransitionOnChange
                >
                    <ThemeToggle />
                </ThemeProvider>
            </div>,
        );
    });

    it('should render', async () => {
        const themeSwitcher = await screen.findByTestId('theme-switcher');
        expect(themeSwitcher).toBeInTheDocument();
    });

    it('click should switch theme', async () => {
        const themeSwitcher = await screen.findByTestId('theme-switcher');
        themeSwitcher.click();
        waitFor(() => expect(document.documentElement).toHaveClass('dark'));
        themeSwitcher.click();
        waitFor(() => expect(document.documentElement).toHaveClass('dark'));
        themeSwitcher.click();
        waitFor(() => expect(document.documentElement).toHaveClass('light'));
    });

    it('context menu should switch theme', async () => {
        const themeSwitcher = await screen.findByTestId('theme-switcher');

        fireEvent.click(themeSwitcher, { button: 1 });
        screen.findByText('Темная').then((el) => {
            act(() => el.click());
        });
        waitFor(() => expect(document.documentElement).toHaveClass('dark'));

        fireEvent.click(themeSwitcher, { button: 1 });
        screen.findByText('Светлая').then((el) => {
            act(() => el.click());
        });
        waitFor(() => expect(document.documentElement).toHaveClass('light'));
    });
});
