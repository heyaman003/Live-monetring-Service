import { Activity, BarChart3, Shield, Zap } from "lucide-react";

 export const features = [
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Live updates every second with WebSocket connections ensuring zero-latency insights into your microservices health.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Intelligent Alerting',
      description: 'Smart alert system with ML-powered anomaly detection and customizable thresholds for proactive issue resolution.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Performance Analytics',
      description: 'Deep performance insights with automated root cause analysis and predictive scaling recommendations.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: 'Custom Dashboards',
      description: 'Fully customizable dashboards with drag-and-drop widgets and team-specific views for maximum productivity.',
      gradient: 'from-orange-500 to-red-500'
    }
  ];