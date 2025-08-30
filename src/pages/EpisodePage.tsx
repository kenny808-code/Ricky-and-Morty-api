import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getEpisodes } from "@/services/episode";
import type {
  Episode,
  EpisodeFilters as EpisodeFiltersType,
  EpisodeResponse,
} from "@/types/episode";
import { EpisodeFilters } from "@/components/episodes/EpisodeFilter";
import { EpisodeCard } from "@/components/episodes/EpisodeCard";
import { EpisodePagination } from "@/components/episodes/EpisodePagination"; 

export function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [info, setInfo] = useState<EpisodeResponse["info"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentFilters: EpisodeFiltersType = useMemo(
    () => ({
      name: searchParams.get("name") || undefined,
      episode: searchParams.get("episode") || undefined,
      page: Number(searchParams.get("page")) || 1,
    }),
    [searchParams]
  );

  const apiFilters = useMemo(() => {
    const filters: EpisodeFiltersType = {};
    if (currentFilters.name) filters.name = currentFilters.name;
    if (currentFilters.episode) filters.episode = currentFilters.episode;
    if (currentFilters.page) filters.page = currentFilters.page;
    return filters;
  }, [currentFilters]);

  useEffect(() => {
    setLoading(true);
    getEpisodes(apiFilters)
      .then((data) => {
        setEpisodes(data.results);
        setInfo(data.info);
      })
      .catch((error) => {
        console.error("Failed to fetch episodes:", error);
        setEpisodes([]);
        setInfo(null);
      })
      .finally(() => setLoading(false));
  }, [apiFilters]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage < 1 || (info && newPage > info.pages)) return;

      const newParams = new URLSearchParams(searchParams);
      if (newPage > 1) {
        newParams.set("page", String(newPage));
      } else {
        newParams.delete("page");
      }
      setSearchParams(newParams);
    },
    [searchParams, info, setSearchParams]
  );

  const handleFiltersChange = useCallback(
    (newFilters: EpisodeFiltersType) => {
      const params = new URLSearchParams();
      if (newFilters.name) params.set("name", newFilters.name);
      if (newFilters.episode) params.set("episode", newFilters.episode);
      setSearchParams(params);
    },
    [setSearchParams]
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Episodes</h1>

      <EpisodeFilters
        filters={currentFilters}
        onChange={handleFiltersChange}
      />

      {loading && <p>Loading...</p>}

      {!loading && episodes.length === 0 && <p>No episodes found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {episodes.map((epi) => (
          <div
            key={epi.id}
            onClick={() => navigate(`/episode/${epi.id}`)}
            className="cursor-pointer"
          >
            <EpisodeCard episode={epi} />
          </div>
        ))}
      </div>

      {info && (
        <div className="mt-6">
          <EpisodePagination
            currentPage={currentFilters.page || 1}
            totalPages={info.pages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}