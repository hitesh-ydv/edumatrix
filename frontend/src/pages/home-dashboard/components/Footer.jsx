import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "Home", route: "/" },
        { label: "Roadmaps", route: "/roadmaps-catalog" },
        { label: "Notes", route: "/notes-repository" },
        { label: "Exams", route: "/exams-internships-hub" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Study Materials", route: "/notes-repository" },
        { label: "Practice Tests", route: "/exams-internships-hub" },
        { label: "Career Guidance", route: "/contact-suggestions" },
        { label: "Interview Prep", route: "/roadmaps-catalog" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", route: "/contact-suggestions" },
        { label: "Suggestions", route: "/contact-suggestions" },
        { label: "Help Center", route: "/contact-suggestions" },
        { label: "Community", route: "/contact-suggestions" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", url: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: "Twitter", url: "#", color: "hover:text-blue-400" },
    { name: "LinkedIn", icon: "Linkedin", url: "#", color: "hover:text-blue-700" },
    { name: "Instagram", icon: "Instagram", url: "#", color: "hover:text-pink-600" },
    { name: "YouTube", icon: "Youtube", url: "#", color: "hover:text-red-600" }
  ];

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleSocialClick = (url) => {
    if (url !== "#") {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-0 lg:flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-300 max-w-md">
                Get the latest roadmaps, study materials, and career opportunities delivered to your inbox.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button
                  variant="default"
                  iconName="Send"
                  iconPosition="right"
                  className="whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Icon name="Code" size={24} color="white" />
              </div>
              <span className="text-xl font-bold text-white">
                CSE Roadmap Hub
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Your comprehensive guide to B.Tech CSE success. Empowering students with structured learning paths, quality resources, and career guidance.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks?.map((social) => (
                <button
                  key={social?.name}
                  onClick={() => handleSocialClick(social?.url)}
                  className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition-colors duration-200 ${social?.color}`}
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections?.map((section) => (
            <div key={section?.title}>
              <h4 className="text-lg font-semibold text-white mb-4">
                {section?.title}
              </h4>
              <ul className="space-y-3">
                {section?.links?.map((link) => (
                  <li key={link?.label}>
                    <button
                      onClick={() => handleNavigation(link?.route)}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link?.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-gray-400 text-sm">
                © {currentYear} CSE Roadmap Hub. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <button className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Privacy Policy
                </button>
                <button className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Terms of Service
                </button>
                <button className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Cookie Policy
                </button>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Made with</span>
              <Icon name="Heart" size={16} className="text-red-500 fill-current" />
              <span className="text-gray-400 text-sm">for students</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;