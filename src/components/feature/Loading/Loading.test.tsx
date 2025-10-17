import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Loading } from './Loading';

describe('Loading', () => {
  it('renders loading text', () => {
    render(<Loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders pokeball icon', () => {
    render(<Loading />);
    const image = screen.getByAlt('Loading');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/pokeball.svg');
  });

  it('calls onBackClick when back button is clicked', () => {
    const mockBackClick = vi.fn();
    render(<Loading onBackClick={mockBackClick} />);
    
    const backButton = screen.getByRole('button');
    fireEvent.click(backButton);
    
    expect(mockBackClick).toHaveBeenCalledOnce();
  });

  it('renders without onBackClick prop', () => {
    render(<Loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('has correct styling', () => {
    render(<Loading />);
    const heading = screen.getByText('Loading...');
    expect(heading).toHaveStyle({ fontFamily: 'Single Day, cursive' });
  });
});

