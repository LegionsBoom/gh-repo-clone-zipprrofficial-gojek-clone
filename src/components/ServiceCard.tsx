import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  category: string;
  onClick?: () => void;
}

export default function ServiceCard({ title, description, icon, category, onClick }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-xl bg-white/20 backdrop-blur-md border border-white/20 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={icon} alt={title} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="mt-4 text-gray-700">{description}</p>
        <div className="mt-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-vb-orange/10 text-vb-orange">
            {category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}