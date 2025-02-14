import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../src/components/ui/Button';

describe('App', () => {
  it('renders with the correct text', () => {
    render(<Button>Press me</Button>);
    expect(screen.getByText('Press me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the \'disabled\' prop is true', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
  });
});
