import { render, screen } from "@testing-library/react";
import { GifGrid } from "../../src/components/GifGrid";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

jest.mock('../../src/hooks/useFetchGifs')

describe('Prueba del componente <GifGrid />', () => { 
    const category = 'One Prunch';

    test('Debe de mostrar el loading inicialmente',  () => {
        useFetchGifs.mockReturnValue({
            images: [],
            isLoading: true,
        })

        render(<GifGrid category={ category } />)
        // screen.debug();

        // const h2 = screen.findByRole('heading', { level: 2 });
        // expect(h2).toBeTruthy()
        // console.log(h2);
        // expect(h2.value).toBe('Cargando...')

        expect(screen.getByText('Cargando...'));
        expect(screen.getByText(category));
    });
    
    test('Debe de mostrar items cuando se carga imagenes',  () => {
        const gifs = [
            {id: 'ABC', title: 'Saitama', url: 'https://saitama.com/1.jpg'},
            {id: 'SaiOMG', title: 'Saitama OMG', url: 'https://saitama.com/2.jpg'}
        ]
        
        useFetchGifs.mockReturnValue({
            images: gifs,
            isLoading: false,
        })

        render(<GifGrid category={ category } />)
        
        expect(screen.getByText(category));
        expect(screen.getAllByRole('img').length).toBe(2);
    });
 })