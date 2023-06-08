import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { GifExpertApp } from "../src/GifExpertApp"

describe('Pruebas en <GifExpertApp />', () => { 
    const defaultCategory = 'One Punch';

    test('Debe de agregar una categoria', async() => { 
        render(<GifExpertApp />)

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        // Cambiar texto de la caja de texto
        fireEvent.input(input, { target: { value: 'Dragon Ball' } });
        fireEvent.submit(form);

        await waitForElementToBeRemoved(
            () => screen.getAllByText("Cargando...")
        );

        expect(screen.getByText('GifExpertApp')).toBeTruthy();
        expect(screen.getByText(defaultCategory)).toBeTruthy();
        expect(screen.getAllByRole('heading', {level: 3}).length).toBe(2);
        expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
     })

     test('No debe agregar una categoria que ya existe', async() => { 
        render(<GifExpertApp />)

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        // Cambiar texto de la caja de texto
        fireEvent.input(input, { target: { value: defaultCategory } });
        fireEvent.submit(form);

        await waitForElementToBeRemoved(
            () => screen.getByText("Cargando...")
        );

        expect(screen.getByText('GifExpertApp')).toBeTruthy();
        expect(screen.getByText(defaultCategory)).toBeTruthy();
        expect(screen.getAllByRole('heading', {level: 3}).length).toBe(1);
        expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
     })
 })