import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Service } from "@/types/service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/lib/toast";

interface ServiceFormModalProps {
  isOpen: boolean;
  service?: Service;
  onClose: () => void;
  onSuccess: () => void;
}

export function ServiceFormModal({ isOpen, service, onClose, onSuccess }: ServiceFormModalProps) {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    type: service?.type || 'API' as Service['type'],
    status: service?.status || 'Online' as Service['status'],
    url: service?.url || '',
    description: service?.description || '',
  });

  const queryClient = useQueryClient();
  const isEditing = Boolean(service);

  const createMutation = useMutation({
    mutationFn: async (data: Omit<Service, 'id' | 'lastChecked' | 'uptime'>) => {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create service');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success("Service created successfully.");
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to create service. Please try again.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; updates: Partial<Service> }) => {
      const res = await fetch(`/api/services/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.updates),
      });
      if (!res.ok) throw new Error('Failed to update service');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success("Service updated successfully.");
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to update service. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
    toast.error("Service name is required.");
      return;
    }

    const serviceData = {
      name: formData.name.trim(),
      type: formData.type,
      status: formData.status,
      url: formData.url.trim() || undefined,
      description: formData.description.trim() || undefined,
      responseTime: Math.floor(Math.random() * 500) + 50,
    };

    if (isEditing && service) {
      updateMutation.mutate({ id: service.id, updates: serviceData });
    } else {
      createMutation.mutate(serviceData);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Service' : 'Add New Service'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Service Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., User Authentication API"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value: Service['type']) => 
                setFormData({ ...formData, type: value })
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="API">API</SelectItem>
                  <SelectItem value="Database">Database</SelectItem>
                  <SelectItem value="Queue">Queue</SelectItem>
                  <SelectItem value="Cache">Cache</SelectItem>
                  <SelectItem value="Storage">Storage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: Service['status']) => 
                setFormData({ ...formData, status: value })
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Degraded">Degraded</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL (Optional)</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://api.example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the service..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (isEditing ? 'Update Service' : 'Create Service')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
