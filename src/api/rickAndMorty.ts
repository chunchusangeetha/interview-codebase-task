
import { Character, CharacterListResponse } from "../types/rickAndMorty";

const BASE_URL = "https://rickandmortyapi.com/api";

export const fetchCharacters = async () => {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    if (!res.ok) throw new Error("Failed to fetch characters");
    return res.json();
  };
  
  export const fetchCharacterById = async (id: string) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!res.ok) throw new Error("Failed to fetch character");
    return res.json();
  };
  
