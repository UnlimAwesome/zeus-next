import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import { render, screen } from '@testing-library/react';

describe('ThemeSwitcher', () => {
    it('should render', () => {
        render(<ThemeSwitcher />);
        expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
    });
});
