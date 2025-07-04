import { motion } from 'framer-motion';
import { features } from '@/data/landing_page.dummy.data';
import { containerVariants, itemVariants } from '@/lib/varients';
export const FeatureSection = () => {
  return (
    <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10 px-6 py-20 max-w-7xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                Built for Modern
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  SRE Teams
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Every feature designed with reliability engineers in mind. From
                real-time monitoring to predictive analytics, we&rsquo;ve got your
                infrastructure covered.
              </p>
            </motion.div>
    
            <div className="grid lg:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${feature.gradient
                        .replace("from-", "")
                        .replace("to-", ", ")})`,
                    }}
                  />
    
                  <div className="relative z-10">
                    <div
                      className={`inline-flex p-3 bg-gradient-to-r ${feature.gradient} rounded-xl mb-6`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
    
  );
};