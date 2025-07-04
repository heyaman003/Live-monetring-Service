
import { itemVariants } from "@/lib/varients";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation"; 
export const Hero_section = () => {
  const router = useRouter();
  return (
    <div className="space-y-8">
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-semibold uppercase tracking-wide">
            Next-Gen SRE Platform
          </span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
          Live Service
          <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Monitoring
          </span>
          Dashboard
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          Real-time microservice health monitoring with zero-latency insights.
          Built for Site Reliability Engineers who demand precision, speed, and
          reliability.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="px-8 py-4 bg-gradient-to-r cursor-pointer from-blue-500 to-cyan-500 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-8 py-4 cursor-pointer bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-colors"
        >
          Watch Demo
        </button>
      </motion.div>
    </div>
  );
};
