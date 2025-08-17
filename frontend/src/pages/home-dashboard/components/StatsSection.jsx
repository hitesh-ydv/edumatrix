import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const [counters, setCounters] = useState({
    students: 0,
    roadmaps: 0,
    resources: 0,
    success: 0
  });

  const finalStats = {
    students: 25000,
    roadmaps: 150,
    resources: 5000,
    success: 95
  };

  const statsData = [
    {
      key: 'students',
      label: 'Active Students',
      value: finalStats?.students,
      icon: 'Users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      suffix: '+'
    },
    {
      key: 'roadmaps',
      label: 'Learning Roadmaps',
      value: finalStats?.roadmaps,
      icon: 'Map',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      suffix: '+'
    },
    {
      key: 'resources',
      label: 'Study Resources',
      value: finalStats?.resources,
      icon: 'BookOpen',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      suffix: '+'
    },
    {
      key: 'success',
      label: 'Success Rate',
      value: finalStats?.success,
      icon: 'TrendingUp',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      suffix: '%'
    }
  ];

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setCounters(prev => {
        const newCounters = { ...prev };
        let allComplete = true;

        Object.keys(finalStats)?.forEach(key => {
          if (newCounters?.[key] < finalStats?.[key]) {
            const increment = Math.ceil(finalStats?.[key] / steps);
            newCounters[key] = Math.min(newCounters?.[key] + increment, finalStats?.[key]);
            allComplete = false;
          }
        });

        if (allComplete) {
          clearInterval(timer);
        }

        return newCounters;
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000)?.toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    }
    return num?.toString();
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join a community of successful B.Tech CSE students who have achieved their goals with our platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statsData?.map((stat) => (
            <div
              key={stat?.key}
              className="text-center group"
            >
              {/* Icon Container */}
              <div className={`${stat?.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon 
                  name={stat?.icon} 
                  size={28} 
                  className={stat?.color}
                />
              </div>

              {/* Counter */}
              <div className="mb-2">
                <span className="text-3xl lg:text-4xl font-bold text-white">
                  {stat?.key === 'students' || stat?.key === 'resources' 
                    ? formatNumber(counters?.[stat?.key])
                    : counters?.[stat?.key]
                  }
                  <span className="text-2xl lg:text-3xl">{stat?.suffix}</span>
                </span>
              </div>

              {/* Label */}
              <p className="text-sm lg:text-base text-gray-300 font-medium">
                {stat?.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial Quote */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-xl lg:text-2xl font-medium text-gray-200 mb-6">
              "CSE Roadmap Hub transformed my learning journey. The structured roadmaps and comprehensive resources helped me land my dream job at a top tech company."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">AR</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Arjun Reddy</p>
                <p className="text-sm text-gray-300">Software Engineer at Google</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Icon name="Award" size={16} className="text-yellow-400" />
            <span className="text-sm font-medium">Top Rated Platform</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Icon name="Shield" size={16} className="text-green-400" />
            <span className="text-sm font-medium">Trusted Content</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Icon name="Zap" size={16} className="text-blue-400" />
            <span className="text-sm font-medium">Fast Learning</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;