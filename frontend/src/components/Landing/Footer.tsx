import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export const Footer = () => {
  return (
   <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 px-6 py-12 bg-black/40 backdrop-blur-sm border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">MonitoCorp</span>
          </div>
          <p className="text-gray-400">
            © 2025 MonitoCorp. Empowering SRE teams with next-generation monitoring solutions.
          </p>
        </div>
     </motion.footer>
  );
}