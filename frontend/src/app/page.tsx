"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Bell,
  Clock,
  TrendingUp,
  Server,
  Play,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Footer } from "@/components/Landing/Footer";
import { CTA_Section } from "@/components/Landing/CTA.Section";
import { containerVariants, itemVariants } from "@/lib/varients";
import { getStatusIcon } from "@/components/Landing/GetStatus.icon";
import { FeatureSection } from "@/components/Landing/Feature.section";
import { Hero_section } from "@/components/Landing/Hero.section";
import { useRouter } from 'next/navigation';

const RandomDots = dynamic(() => import("@/components/Landing/Dots"), {
  ssr: false,
});

const Home = () => {
  const router = useRouter();
  const [liveData, setLiveData] = useState({
    services: 247,
    uptime: 99.97,
    alerts: 3,
    responseTime: 127,
  });

  // ----- STIMULATE LIVE DATA UPDATES HERE -------- //
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prev) => ({
        services: prev.services + Math.floor(Math.random() * 3) - 1,
        uptime: 99.95 + Math.random() * 0.05,
        alerts: Math.max(0, prev.alerts + Math.floor(Math.random() * 3) - 1),
        responseTime: 120 + Math.floor(Math.random() * 20),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      icon: Server,
      label: "Active Services",
      value: liveData.services,
      color: "text-blue-500",
    },
    {
      icon: TrendingUp,
      label: "Uptime",
      value: `${liveData.uptime.toFixed(2)}%`,
      color: "text-green-500",
    },
    {
      icon: Bell,
      label: "Active Alerts",
      value: liveData.alerts,
      color: "text-orange-500",
    },
    {
      icon: Clock,
      label: "Avg Response",
      value: `${liveData.responseTime}ms`,
      color: "text-purple-500",
    },
  ];

  const serviceStatus = [
    {
      name: "Auth Service",
      status: "healthy",
      uptime: "99.99%",
      requests: "2.3M",
    },
    {
      name: "Payment Gateway",
      status: "healthy",
      uptime: "99.95%",
      requests: "1.8M",
    },
    {
      name: "User Management",
      status: "warning",
      uptime: "99.89%",
      requests: "3.1M",
    },
    {
      name: "Analytics Engine",
      status: "healthy",
      uptime: "99.97%",
      requests: "890K",
    },
    {
      name: "Notification Hub",
      status: "critical",
      uptime: "97.23%",
      requests: "1.2M",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* -----Animated Background Elements----- */}
      <div className="absolute inset-0 overflow-hidden">
        <RandomDots />
      </div>

      {/* -----Navigation------ */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-6 py-4 bg-black/20 backdrop-blur-sm border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">MonitoCorp</h1>
              <p className="text-xs text-gray-400">SRE Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg transition-shadow"
              onClick={() => router.push('/dashboard')}
            >
              <Play className="w-4 h-4 inline mr-2" />
              Live Demo
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-6 py-20 max-w-7xl mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Hero_section/>
          {/* Live Metrics Dashboard Preview */}
          <motion.div variants={itemVariants} className="relative">
            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Live System Status</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">Live</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 cursor-pointer"
                    
                  >
                    <div className="flex items-center justify-between">
                      <metric.icon className={`w-5 h-5 ${metric.color}`} />
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={metric.value}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="text-2xl font-bold"
                        >
                          {metric.value}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{metric.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-400">
                  Service Status
                </h4>
                {serviceStatus.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(service.status)}
                      <span className="text-sm font-medium">
                        {service.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>{service.uptime}</span>
                      <span>{service.requests}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      <FeatureSection/>
      <CTA_Section />

      <Footer />
    </div>
  );
};

export default Home;
