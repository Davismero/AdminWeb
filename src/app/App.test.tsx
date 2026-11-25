import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('muestra el placeholder del panel de administración', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Panel de administración de TosaBus',
      }),
    ).toBeTruthy();
  });
});
