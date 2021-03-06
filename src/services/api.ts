import useSWR from 'swr';
import { IPokemon, IPokemonCard } from '../interfaces/IPokemon';

export const baseUrl = 'https://api.pokemontcg.io/v2';
export const pokemonPerPage = 30;

const fetcher = (url: string, apiKey: string): Promise<any> =>
    fetch(url, {
        method: 'get',
        headers: new Headers({
            'X-API-KEY': apiKey,
        }),
    }).then((resp) => resp.json());

export function getCardsData(
    page: number,
    type?: string,
    name?: string
): IPokemon {
    let url = '';

    if (name) {
        url = `${baseUrl}/cards?q=name:${name}&page=${page}&pageSize=${pokemonPerPage}`;
    } else {
        url = `${baseUrl}/cards?q=types:${type}&page=${page}&pageSize=${pokemonPerPage}`;
    }

    const { data: pokemonData, error } = useSWR(
        [url, process.env.REACT_APP_API_KEY],
        fetcher
    );

    return {
        pokemonData,
        isLoading: !pokemonData && !error,
        isError: error,
    };
}

export function getCardData(id: string): IPokemonCard {
    const { data: pokemonData, error } = useSWR(
        [`${baseUrl}/cards/${id}`, process.env.REACT_APP_API_KEY],
        fetcher
    );

    return {
        pokemonData,
        isLoading: !pokemonData && !error,
        isError: error,
    };
}
