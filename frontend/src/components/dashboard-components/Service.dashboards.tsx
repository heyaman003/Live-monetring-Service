import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Service, ServiceFilters } from "@/types/service";
import { ServiceTable } from "@/components/dashboard-components/Service.table";
import { ServiceFiltersComponent } from "@/components/dashboard-components/Service.filters";
import { ServiceFormModal } from "@/components/dashboard-components/Service.formModal";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { toast } from "@/lib/toast";

interface ServiceDashboardProps {
  onSelectService: (serviceId: string) => void;
}

export function ServiceDashboard({ onSelectService }: ServiceDashboardProps) {
  const [filters, setFilters] = useState<ServiceFilters>({ status: 'All', search: '' });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Main services query with caching and live updates
  const { 
    data: services = [], 
    isLoading, 
    refetch,
    isRefetching 
  } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await fetch('/api/services');
      if (!res.ok) throw new Error('Failed to fetch services');
      const services = (await res.json()) as Service[];
      return services.map((service: Service) => ({
        ...service,
        
      }));
    },
    staleTime: 10000, // Cache for 10 seconds
    refetchInterval: 15000, // Refetch every 15 seconds for live updates
    refetchOnWindowFocus: true, // Refresh when user returns to tab
  });

  // Filter services based on current filters
  const filteredServices = services.filter(service => {
    const matchesStatus = filters.status === 'All' || service.status === filters.status;
    const matchesSearch = !filters.search || 
      service.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      service.type.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Handle visibility change for immediate refresh when returning to tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refetch();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [refetch]);

  const handleManualRefresh = () => {
    refetch();
    toast.info("Services list updated...");
  };

  const handleCreateService = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
  };

  const handleDeleteService = async (serviceId: string) => {
    try {
      await fetch(`/api/services/${serviceId}`, { method: 'DELETE' });
      refetch(); // Refresh the list after deletion
      toast.success("The service has been successfully removed.");
    } catch (error) {
      toast.error("Failed to delete service. Please try again.");
      console.error("Error deleting service:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-5 w-5 animate-spin text-slate-500" />
          <span className="text-slate-600">Loading services...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Service Overview</h2>
          <p className="text-slate-600">
            {filteredServices.length} of {services.length} services
            {isRefetching && (
              <span className="ml-2 inline-flex items-center text-sm text-blue-600">
                <RefreshCw className="h-3 w-3 animate-spin mr-1" />
                Updating...
              </span>
            )}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleManualRefresh}
            disabled={isRefetching}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
          <Button onClick={handleCreateService} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Service</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <ServiceFiltersComponent
        filters={filters}
        onFiltersChange={setFilters}
        totalServices={services.length}
        filteredCount={filteredServices.length}
      />

      {/* Services Table */}
      <ServiceTable
        services={filteredServices}
        onSelectService={onSelectService}
        onEditService={handleEditService}
        onDeleteService={handleDeleteService}
      />

      {/* Modals */}
      <ServiceFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false);
          refetch();
        }}
      />

      {editingService && (
        <ServiceFormModal
          isOpen={true}
          service={editingService}
          onClose={() => setEditingService(null)}
          onSuccess={() => {
            setEditingService(null);
            refetch();
          }}
        />
      )}
    </div>
  );
}
