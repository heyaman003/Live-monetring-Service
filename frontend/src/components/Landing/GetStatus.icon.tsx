import { ServiceStatus } from "@/interfaces/global.interface";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

  export const getStatusIcon = (status: ServiceStatus['status']): React.ReactElement => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'critical': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };
