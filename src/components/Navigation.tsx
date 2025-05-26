import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="bg-white/30 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-vb-orange via-vb-purple to-vb-green bg-clip-text text-transparent">
              VillageBlocks
            </span>
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/services" className="text-gray-700 hover:text-vb-orange px-3 py-2 rounded-md">
              Services
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-vb-orange px-3 py-2 rounded-md">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}