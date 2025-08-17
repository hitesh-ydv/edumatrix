import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import axios from 'axios';

const TopResourcesGrid = () => {
  const navigate = useNavigate();

  // const topResources = [
  //   {
  //     id: 1,
  //     title: "Complete System Design Guide",
  //     description: "Master system design concepts with real-world examples and case studies. Perfect for technical interviews.",
  //     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  //     type: "Guide",
  //     category: "System Design",
  //     rating: 4.9,
  //     views: "25K",
  //     duration: "6 hours read",
  //     tags: ["System Design", "Interviews", "Architecture"],
  //     route: "/notes-repository",
  //     featured: true
  //   },
  //   {
  //     id: 2,
  //     title: "GATE CSE Previous Papers",
  //     description: "Last 10 years solved papers with detailed explanations and marking schemes.",
  //     image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=400&h=250&fit=crop",
  //     type: "Papers",
  //     category: "GATE Preparation",
  //     rating: 4.8,
  //     views: "18K",
  //     duration: "200+ questions",
  //     tags: ["GATE", "Previous Papers", "Practice"],
  //     route: "/exams-internships-hub",
  //     featured: false
  //   },
  //   {
  //     id: 3,
  //     title: "Full Stack Development Roadmap",
  //     description: "Complete roadmap from frontend to backend with hands-on projects and industry insights.",
  //     image: "https://images.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.jpg?w=400&h=250&fit=crop",
  //     type: "Roadmap",
  //     category: "Web Development",
  //     rating: 4.7,
  //     views: "32K",
  //     duration: "8 months",
  //     tags: ["Full Stack", "React", "Node.js"],
  //     route: "/roadmaps-catalog",
  //     featured: true
  //   },
  //   {
  //     id: 4,
  //     title: "Machine Learning Fundamentals",
  //     description: "Comprehensive notes covering ML algorithms, mathematics, and practical implementations.",
  //     image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
  //     type: "Notes",
  //     category: "Machine Learning",
  //     rating: 4.6,
  //     views: "15K",
  //     duration: "4 hours read",
  //     tags: ["ML", "AI", "Python"],
  //     route: "/notes-repository",
  //     featured: false
  //   }
  // ];

  const [topResources, setTopResources] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/top-resources")
      .then(res => {
        setTopResources(res.data)
        console.log(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleResourceClick = (resource) => {
    navigate(resource?.route, { state: { resource } });
  };

  const handleViewAll = () => {
    navigate('/notes-repository');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Top Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Handpicked resources that have helped thousands of students succeed
            </p>
          </div>
          <div className="mt-6 sm:mt-0">
            <Button
              variant="outline"
              onClick={handleViewAll}
              iconName="ArrowRight"
              iconPosition="right"
            >
              View All Resources
            </Button>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topResources?.map((resource) => (
            <div
              key={resource?.id}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-elevation-2 transition-all duration-300 cursor-pointer hover:-translate-y-1"
              onClick={() => handleResourceClick(resource)}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={resource?.image}
                  alt={resource?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Featured Badge */}
                {resource?.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center space-x-1 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      <Icon name="Star" size={12} />
                      <span>Featured</span>
                    </span>
                  </div>
                )}

                {/* Type Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                    {resource?.type}
                  </span>
                </div>

                {/* Quick Action Button */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="secondary"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    View
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {resource?.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                    <span className="text-xs font-medium text-gray-600">{resource?.rating}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {resource?.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {resource?.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource?.tags?.slice(0, 2)?.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {resource?.tags?.length > 2 && (
                    <span className="text-xs text-gray-400">
                      +{resource?.tags?.length - 2} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>{resource?.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{resource?.duration}</span>
                    </div>
                  </div>
                  <Icon
                    name="ArrowRight"
                    size={14}
                    className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Suggest a resource or contact our team to help you find the perfect study material
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                onClick={() => navigate('/contact-suggestions')}
                iconName="Plus"
                iconPosition="left"
              >
                Suggest Resource
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/contact-suggestions')}
                iconName="MessageCircle"
                iconPosition="left"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopResourcesGrid;