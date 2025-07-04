
import { ServiceFilters, Service } from "@/types/service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ServiceFiltersComponentProps {
  filters: ServiceFilters;
  onFiltersChange: (filters: ServiceFilters) => void;
  totalServices: number;
  filteredCount: number;
}

export function ServiceFiltersComponent({ 
  filters, 
  onFiltersChange, 
  totalServices, 
  filteredCount 
}: ServiceFiltersComponentProps) {
  const handleStatusChange = (status: string) => {
    onFiltersChange({
      ...filters,
      status: status as Service['status'] | 'All'
    });
  };

  const handleSearchChange = (search: string) => {
    onFiltersChange({
      ...filters,
      search
    });
  };

  const clearFilters = () => {
    onFiltersChange({ status: 'All', search: '' });
  };

  const hasActiveFilters = filters.status !== 'All' || (filters.search && filters.search.length > 0);

  return (
    <Card className="p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search services..."
              value={filters.search || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <Select value={filters.status || 'All'} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Degraded">Degraded</SelectItem>
                <SelectItem value="Offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary and Clear Button */}
        <div className="flex items-center space-x-4">
          <div className="text-sm text-slate-600">
            Showing {filteredCount} of {totalServices} services
          </div>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
