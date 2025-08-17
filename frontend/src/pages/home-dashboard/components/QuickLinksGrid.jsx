import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickLinksGrid = () => {
  const navigate = useNavigate();

  const quickLinks = [
    {
      id: 1,
      title: "Roadmaps",
      description: "Structured learning paths for every skill",
      icon: "Map",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      route: "/roadmaps-catalog",
      stats: "25+ Paths"
    },
    {
      id: 2,
      title: "Notes",
      description: "Comprehensive study materials",
      icon: "BookOpen",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      route: "/notes-repository",
      stats: "500+ Notes"
    },
    {
      id: 3,
      title: "Teachers",
      description: "Expert guidance and recommendations",
      icon: "Users",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      route: "/contact-suggestions",
      stats: "50+ Experts"
    },
    {
      id: 4,
      title: "Internships",
      description: "Career opportunities and guidance",
      icon: "Briefcase",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      route: "/exams-internships-hub",
      stats: "100+ Openings"
    },
    {
      id: 5,
      title: "Exams",
      description: "Competitive exam preparation",
      icon: "GraduationCap",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      route: "/exams-internships-hub",
      stats: "15+ Exams"
    }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Quick Access
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Jump straight to what you need with our organized resource categories
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {quickLinks?.map((link) => (
            <div
              key={link?.id}
              onClick={() => handleCardClick(link?.route)}
              className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-elevation-2 transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div className={`${link?.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon 
                  name={link?.icon} 
                  size={28} 
                  className={link?.iconColor}
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {link?.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {link?.description}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-medium text-gray-500">
                    {link?.stats}
                  </span>
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Hover Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${link?.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/contact-suggestions')}
            iconName="MessageCircle"
            iconPosition="left"
          >
            Need Help? Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default QuickLinksGrid;