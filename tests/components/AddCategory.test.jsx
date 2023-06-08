import { fireEvent, render, screen } from "@testing-library/react";
import { AddCategory } from "../../src/components/AddCategory";

describe('Pruebas en el componente <AddCategory />', () => { 

    test('Debe cambiar el valor de la caja de texto', () => {
        render(<AddCategory onNewCategory={() => {}} />)
        // screen.debug();

        const input = screen.getByRole('textbox');
        fireEvent.input(input, { target: { value: 'Saitama' } });
        
        expect(input.value).toBe('Saitama');
    });

    test('Debe de llamar onNewCategory si el input tiene un valor', () => {
        const inputValue = 'Saitama';
        const onNewCategoryMock = jest.fn();

        render(<AddCategory onNewCategory={ onNewCategoryMock } />)
        // screen.debug();

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        // Cambiar texto de la caja de texto
        fireEvent.input(input, { target: { value: inputValue } });
        fireEvent.submit(form);
        // screen.debug();
        
        expect(input.value).toBe('');
        expect(onNewCategoryMock).toHaveBeenCalledTimes(1);
        expect(onNewCategoryMock).toHaveBeenCalledWith(inputValue);
    });

    test('No debe de llamar onNewCategory si el input esta vacio', () => {
        const inputValue = '';
        const onNewCategoryMock = jest.fn();

        render(<AddCategory onNewCategory={ onNewCategoryMock } />)

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        fireEvent.submit(form);
        
        expect(input.value).toBe(inputValue);
        expect(onNewCategoryMock).not.toHaveBeenCalled();
    });

    test('No debe de llamar onNewCategory si el input tiene 1 letra', () => {
        const inputValue = '1';
        const onNewCategoryMock = jest.fn();

        render(<AddCategory onNewCategory={ onNewCategoryMock } />)
        // screen.debug();

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        // Cambiar texto de la caja de texto
        fireEvent.input(input, { target: { value: inputValue } });
        fireEvent.submit(form);
        // screen.debug();
        
        expect(input.value).toBe(inputValue);
        expect(onNewCategoryMock).not.toHaveBeenCalled();
    });
});