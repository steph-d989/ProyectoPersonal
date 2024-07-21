import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Catalogo from '../Catalogo';
import { describe, test, expect } from 'vitest';

describe('Catalogo', () => {
  test('debería renderizar el Catalogo', async () => {
    render(<Catalogo />);

    await waitFor(() => expect(screen.getByText('Estrategia')).toBeInTheDocument());
  });
});