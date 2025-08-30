import { Input } from "@/components/ui/input";
import type {
  LocationFilters as LocationFiltersType,
} from "@/types/location";
import { Button } from "../ui/button";

type Props = {
  filters: LocationFiltersType;
  onChange: (newFilters: LocationFiltersType) => void;
};

export function LocationFilters({ filters, onChange }: Props) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value || undefined;
    onChange({ ...filters, name });
  };


  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value || undefined;
    onChange({ ...filters, type });
  };

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dimension = e.target.value || undefined;
    onChange({ ...filters, dimension });
  };

  const resetFilters = () => {
    onChange({});
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <Input
        placeholder="Search by name"
        value={filters.name || ""}
        onChange={handleNameChange}
        className="w-full sm:w-auto"
      />
      

      <Input
        placeholder="Search by type"
        value={filters.type || ""}
        onChange={handleTypeChange}
        className="w-full sm:w-auto"
      />

      <Input
        placeholder="Search by dimension"
        value={filters.dimension || ""}
        onChange={handleDimensionChange}
        className="w-full sm:w-auto"
      />


      <Button onClick={resetFilters}>Reset</Button>
    </div>
  );
}