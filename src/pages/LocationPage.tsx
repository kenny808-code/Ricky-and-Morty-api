import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getLocations } from "@/services/location";
import type { Location, LocationFilters as LocationFiltersType, LocationResponse } from "@/types/location";
import { LocationFilters } from "@/components/locations/LocationFilter";
import { LocationCard } from "@/components/locations/LocationCard";
import { LocationPagination } from "@/components/locations/LocationPagination";


export function LocationPage() {
  const [location, setLocation] = useState<Location[]>([]);
  const [info, setInfo] = useState<LocationResponse["info"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Memoize current filters from URL to prevent unnecessary recreations
  const currentFilters: LocationFiltersType = useMemo(() => ({
    name: searchParams.get("name") || undefined,
    type: searchParams.get("type") || undefined,
    dimension: searchParams.get("dimension") || undefined,
    page: Number(searchParams.get("page")) || 1,
  }), [searchParams]);

  // Memoize API filters to prevent unnecessary recreations
  const apiFilters = useMemo(() => {
    const filters: LocationFiltersType = {};
    if (currentFilters.name) filters.name = currentFilters.name;
    if (currentFilters.type) filters.type = currentFilters.type;
    if (currentFilters.dimension) filters.dimension = currentFilters.dimension;
    if (currentFilters.page) filters.page = currentFilters.page;
    return filters;
  }, [currentFilters]);

  // Fetch characters whenever API filters change
  useEffect(() => {
    setLoading(true);

    getLocations(apiFilters)
      .then((data) => {
        setLocation(data.results);
        setInfo(data.info);
      })
      .catch((error) => {
        console.error("Failed to fetch locations:", error);
        setLocation([]);
        setInfo(null);
      })
      .finally(() => setLoading(false));
  }, [apiFilters]);

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage < 1 || (info && newPage > info.pages)) return;
    
    const newParams = new URLSearchParams(searchParams);
    if (newPage > 1) {
      newParams.set("page", String(newPage));
    } else {
      newParams.delete("page");
    }
    setSearchParams(newParams);
  }, [searchParams, info, setSearchParams]);

  const handleFiltersChange = useCallback((newFilters: LocationFiltersType) => {
    const params = new URLSearchParams();
    
    // Add non-empty filters to URL
    if (newFilters.name) params.set("name", newFilters.name);
    if (newFilters.type) params.set("type", newFilters.type);
    if (newFilters.dimension) params.set("dimension", newFilters.dimension);
    // Always reset to page 1 when filters change
    params.set("page", "1");
    setSearchParams(params);
  }, [setSearchParams]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Locations</h1>

      <LocationFilters filters={currentFilters} onChange={handleFiltersChange} />

      {loading && <p>Loading...</p>}

      {!loading && location.length === 0 && <p>No locations found.</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {location.map((loc) => (
          <div key={loc.id} onClick={() => navigate(`/location/${loc.id}`)} className="cursor-pointer">
            <LocationCard location={loc} />
          </div>
        ))}
      </div>

      {info && (
        <div className="mt-6">
          <LocationPagination
            currentPage={currentFilters.page || 1}
            totalPages={info.pages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}