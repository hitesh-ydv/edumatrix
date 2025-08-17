import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const FeaturedRoadmapCard = () => {
  const navigate = useNavigate();

  const featuredRoadmap = {
    id: 1,
    title: "Data Structures & Algorithms Mastery",
    description: "Complete DSA roadmap covering arrays, linked lists, trees, graphs, dynamic programming, and advanced algorithms. Perfect for competitive programming and technical interviews.",
    estimatedTime: "4-6 months",
    difficulty: "Intermediate to Advanced",
    totalSteps: 12,
    completedSteps: 0,
    tags: ["DSA", "Competitive Programming", "Interview Prep", "Problem Solving"],
    features: [
      "450+ Practice Problems",
      "Video Explanations",
      "Progress Tracking",
      "Interview Questions"
    ],
    stats: {
      enrolled: "15,000+",
      rating: 4.8,
      reviews: 2340
    }
  };

  const roadmapSteps = [
    { label: "Arrays & Strings", duration: "2 weeks" },
    { label: "Linked Lists", duration: "1 week" },
    { label: "Stacks & Queues", duration: "1 week" },
    { label: "Trees & BST", duration: "3 weeks" },
    { label: "Graphs", duration: "3 weeks" },
    { label: "Dynamic Programming", duration: "4 weeks" },
    { label: "Advanced Topics", duration: "2 weeks" }
  ];

  const handleViewDetails = () => {
    navigate('/roadmap-detail-view', { 
      state: { 
        roadmap: featuredRoadmap,
        steps: roadmapSteps 
      } 
    });
  };

  const handleExploreAll = () => {
    navigate('/roadmaps-catalog');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Star" size={16} />
            <span>Featured Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Start Your DSA Journey Today
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master the fundamentals that every successful software engineer needs
          </p>
        </div>

        {/* Featured Card */}
        <div className="bg-white rounded-3xl shadow-elevation-2 overflow-hidden max-w-4xl mx-auto">
          <div className="lg:flex">
            {/* Content Side */}
            <div className="lg:w-2/3 p-8 lg:p-12">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                    {featuredRoadmap?.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {featuredRoadmap?.description}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-blue-600" />
                  <span className="text-gray-600">{featuredRoadmap?.estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="BarChart3" size={16} className="text-purple-600" />
                  <span className="text-gray-600">{featuredRoadmap?.difficulty}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-green-600" />
                  <span className="text-gray-600">{featuredRoadmap?.stats?.enrolled} enrolled</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={16} className="text-yellow-500 fill-current" />
                  <span className="font-medium text-gray-900">{featuredRoadmap?.stats?.rating}</span>
                  <span className="text-gray-500">({featuredRoadmap?.stats?.reviews})</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredRoadmap?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {featuredRoadmap?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-green-600" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleViewDetails}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="flex-1 sm:flex-none"
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleExploreAll}
                  iconName="Map"
                  iconPosition="left"
                  className="flex-1 sm:flex-none"
                >
                  Explore All Roadmaps
                </Button>
              </div>
            </div>

            {/* Progress Side */}
            <div className="lg:w-1/3 bg-gradient-to-br from-blue-50 to-purple-50 p-8 lg:p-12">
              <div className="text-center mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Learning Path
                </h4>
                <p className="text-sm text-gray-600">
                  {roadmapSteps?.length} structured steps
                </p>
              </div>

              {/* Progress Indicator */}
              <ProgressIndicator
                steps={roadmapSteps}
                currentStep={featuredRoadmap?.completedSteps}
                variant="vertical"
                showLabels={true}
                className="mb-8"
              />

              {/* Start Learning CTA */}
              <div className="text-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleViewDetails}
                  iconName="Play"
                  iconPosition="left"
                  fullWidth
                >
                  Start Learning
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Free to start • No credit card required
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoadmapCard;