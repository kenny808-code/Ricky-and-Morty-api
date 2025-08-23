import { CharacterCard } from "@/components/characters/CharacterCard";
import { getCharacters } from "@/services/characters";
import type { Character } from "@/types/character";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export function CharactersPage() {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const navigate = useNavigate();

  // Fetch characters whenever API filters change
  useEffect(() => {
    setLoading(true);
    
    getCharacters({})
      .then((data) => {
        setCharacters(data.results);
      })
      .catch((error) => {
        console.error("Failed to fetch characters:", error);
        setCharacters([]);
      })
      .finally(() => setLoading(false));
  }, [setLoading]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Characters</h1>

      {loading && <p>Loading...</p>}

      {!loading && characters.length === 0 && <p>No characters found.</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((char) => (
          <div key={char.id} onClick={() => navigate(`/character/${char.id}`)} className="cursor-pointer">
            <CharacterCard character={char} />
          </div>
        ))}
      </div>
    </div>
  );
}