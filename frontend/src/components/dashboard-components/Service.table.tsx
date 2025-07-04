
import { Service } from "@/types/service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoreHorizontal, Edit, Trash2, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ServiceTableProps {
  services: Service[];
  onSelectService: (serviceId: string) => void;
  onEditService: (service: Service) => void;
  onDeleteService: (serviceId: string) => void;
}

const getStatusColor = (status: Service['status']) => {
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

const getTypeColor = (type: Service['type']) => {
  switch (type) {
    case 'API':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Database':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Queue':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Cache':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Storage':
      return 'bg-pink-100 text-pink-800 border-pink-200';
    default:
      return 'bg-slate-100 text-slate-800 border-slate-200';
  }
};

export function ServiceTable({ services, onSelectService, onEditService, onDeleteService }: ServiceTableProps) {
  if (services.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-slate-400 text-lg">No services found</div>
        <p className="text-slate-500 text-sm mt-2">Try adjusting your filters or add a new service.</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-slate-900">Service</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-slate-900">Type</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-slate-900">Status</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-slate-900">Uptime</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-slate-900">Response Time</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-slate-900">Last Checked</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {services.map((service) => (
              <tr 
                key={service.id} 
                className="hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => onSelectService(service.id)}
              >
                <td className="py-4 px-6">
                  <div>
                    <div className="font-medium text-slate-900">{service.name}</div>
                    {service.description && (
                      <div className="text-sm text-slate-500 truncate max-w-xs">
                        {service.description}
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Badge variant="outline" className={getTypeColor(service.type)}>
                    {service.type}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <Badge variant="outline" className={getStatusColor(service.status)}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      service.status === 'Online' ? 'bg-green-500' :
                      service.status === 'Degraded' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    {service.status}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm font-medium text-slate-900">
                    {service.uptime.toFixed(1)}%
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-slate-900">
                    {service.responseTime ? `${service.responseTime}ms` : 'N/A'}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-slate-500">
                    {new Date(service.lastChecked).toLocaleString()}
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {service.url && (
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(service.url, '_blank');
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open URL
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditService(service);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteService(service.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
