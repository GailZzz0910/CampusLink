import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import StatusBadge from './StatusBadge';

describe('StatusBadge', () => {
  it('renders a human-readable status label', () => {
    render(<StatusBadge value="in_progress" />);
    expect(screen.getByText('In progress')).toBeInTheDocument();
  });
});
