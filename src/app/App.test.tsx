import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App — tema visual (T-02)', () => {
  it('muestra el título del panel de administración', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: 'Panel de administración de TosaBus',
        level: 1,
      }),
    ).toBeTruthy();
  });

  it('muestra el botón principal y la insignia de éxito accesible', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: 'Continuar' })).toBeTruthy();

    const insignia = screen.getByRole('status');
    expect(insignia.textContent).toContain('Éxito: tema visual aplicado');
    expect(insignia.querySelector('svg')).not.toBeNull();
  });
});
