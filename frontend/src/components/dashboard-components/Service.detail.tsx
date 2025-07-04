import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { ServiceEvent } from "@/types/service";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw, Clock, TrendingUp } from "lucide-react";
import { toast } from '@/lib/toast';

interface ServiceDetailsProps {
  serviceId: string;
  onBack: () => void;
}

export function ServiceDetails({ serviceId, onBack }: ServiceDetailsProps) {
  const [events, setEvents] = useState<ServiceEvent[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Fetch service details
  const { data: service, isLoading, refetch } = useQuery({
    queryKey: ['service', serviceId],
    queryFn: async () => {
      const res = await fetch(`/api/services/${serviceId}`);
      if (!res.ok) throw new Error('Failed to fetch service');
      return res.json();
    },
    staleTime: 5000,
    refetchInterval: 10000,
  });

  // Load initial events
  const { data: initialEvents = [] } = useQuery({
    queryKey: ['serviceEvents', serviceId, 0],
    queryFn: async () => {
      const res = await fetch(`/api/services/${serviceId}/events?page=0&limit=10`);
      if (!res.ok) throw new Error('Failed to fetch events');
      return res.json();
    },
    staleTime: 30000,
  });

  // Initialize events when initial data loads
  useEffect(() => {
    if (initialEvents.length > 0) {
      setEvents(initialEvents);
      setHasMore(initialEvents.length === 10);
    }
  }, [initialEvents]);

  // Load more events (infinite scrolling)
  const loadMoreEvents = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const newEventsRes = await fetch(`/api/services/${serviceId}/events?page=${nextPage}&limit=10`);
      if (!newEventsRes.ok) throw new Error('Failed to fetch more events');
      const newEvents = await newEventsRes.json();
      
      if (newEvents.length > 0) {
        setEvents(prev => [...prev, ...newEvents]);
        setPage(nextPage);
        setHasMore(newEvents.length === 10);
      } else {
        setHasMore(false);
      }
    } catch (error) {
        toast.error("Failed to load more events.");
      console.error("Error loading more events:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [serviceId, page, isLoadingMore, hasMore]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMoreEvents();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreEvents]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Degraded':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Offline':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-5 w-5 animate-spin text-slate-500" />
          <span className="text-slate-600">Loading service details...</span>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-slate-900 mb-2">Service not found</h3>
        <p className="text-slate-500 mb-4">The requested service could not be found.</p>
        <Button onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{service.name}</h2>
            <p className="text-slate-600">{service.description}</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => refetch()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Service Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Status</p>
              <Badge variant="outline" className={`mt-2 ${getStatusColor(service.status)}`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  service.status === 'Online' ? 'bg-green-500' :
                  service.status === 'Degraded' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                {service.status}
              </Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Uptime</p>
              <p className="text-2xl font-bold text-slate-900">{service.uptime.toFixed(1)}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Response Time</p>
              <p className="text-2xl font-bold text-slate-900">
                {service.responseTime ? `${service.responseTime}ms` : 'N/A'}
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Type</p>
              <p className="text-2xl font-bold text-slate-900">{service.type}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Events History */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Events</h3>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-start space-x-4 pb-4 border-b border-slate-100 last:border-b-0">
              <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                event.status === 'Online' ? 'bg-green-500' :
                event.status === 'Degraded' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900">{event.message}</p>
                  <Badge variant="outline" className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
                {event.details && (
                  <p className="text-sm text-slate-600 mt-2">{event.details}</p>
                )}
              </div>
            </div>
          ))}

          {/* Load more button/indicator */}
          {hasMore && (
            <div className="text-center pt-4">
              {isLoadingMore ? (
                <div className="flex items-center justify-center space-x-2">
                  <RefreshCw className="h-4 w-4 animate-spin text-slate-500" />
                  <span className="text-slate-600">Loading more events...</span>
                </div>
              ) : (
                <Button variant="outline" onClick={loadMoreEvents}>
                  Load More Events
                </Button>
              )}
            </div>
          )}

          {!hasMore && events.length > 0 && (
            <div className="text-center pt-4 text-slate-500 text-sm">
              No more events to load
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
