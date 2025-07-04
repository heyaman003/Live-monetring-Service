'use client'
import { useState } from "react";
import { ServiceDashboard } from "@/components/dashboard-components/Service.dashboards";
import { ServiceDetails } from "@/components/dashboard-components/Service.detail";

const Page = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">MonitoCorp Dashboard</h1>
              <p className="text-slate-600 text-sm">Site Reliability Engineering Portal</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600">Live Monitoring</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedServiceId ? (
          <ServiceDetails 
            serviceId={selectedServiceId} 
            onBack={() => setSelectedServiceId(null)} 
          />
        ) : (
          <ServiceDashboard onSelectService={setSelectedServiceId} />
        )}
      </main>
    </div>
  );
};

export default Page;
