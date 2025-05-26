import ServiceCard from '../components/ServiceCard';

const services = [
  {
    title: "Home Services",
    description: "Find reliable workers for home maintenance and repairs in your native country",
    icon: "https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Maintenance"
  },
  {
    title: "Delivery",
    description: "Fast and reliable delivery services connecting you with local businesses",
    icon: "https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Transport"
  },
  {
    title: "Professional Services",
    description: "Connect with skilled professionals for business and personal needs",
    icon: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Professional"
  }
];

export default function Home() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          VillageBlocks
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connecting African diaspora with trusted service providers back home
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            {...service}
          />
        ))}
      </div>
    </div>
  );
}