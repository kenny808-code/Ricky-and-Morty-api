import { Routes, Route, Navigate } from "react-router-dom";
import { CharactersPage } from "./pages/CharactersPage";
import { CharacterDetailPage } from "./pages/CharacterDetailPage";
import { LocationDetailPage } from "./pages/LocationDetailPage";
import { LocationPage } from "./pages/LocationPage";
import { Navbar } from "./components/navigation/Nav";
import { EpisodesPage } from "./pages/EpisodePage";
import { EpisodeDetailPage } from "./pages/EpisodeDetailPage";

export function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/characters" replace />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
        <Route path="/locations" element={<LocationPage />} />
        <Route path="/location/:id" element={<LocationDetailPage />} />
        <Route path="/episodes" element={<EpisodesPage />} />
        <Route path="/episode/:id" element={<EpisodeDetailPage />} />
      </Routes>
    </>
  );
}

export default App
