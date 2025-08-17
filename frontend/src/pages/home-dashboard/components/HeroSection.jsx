import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/ui/SearchBar';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleSearch = (query, results) => {
    console.log('Search query:', query, 'Results:', results);
    // Navigate to appropriate page based on search results
    if (results?.length > 0) {
      const firstResult = results?.[0];
      switch (firstResult?.type) {
        case 'roadmap': navigate('/roadmaps-catalog');
          break;
        case 'notes': navigate('/notes-repository');
          break;
        case 'exam': navigate('/exams-internships-hub');
          break;
        default:
          navigate('/roadmaps-catalog');
      }
    }
  };

  const handleResultSelect = (result) => {
    console.log('Selected result:', result);
    // Navigate based on selected result type
    switch (result?.type) {
      case 'roadmap': navigate('/roadmap-detail-view', { state: { roadmap: result } });
        break;
      case 'notes': navigate('/notes-repository');
        break;
      case 'exam': navigate('/exams-internships-hub');
        break;
      default:
        navigate('/roadmaps-catalog');
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Content */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your one-stop guide for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              B.Tech CSE success
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Navigate your academic journey with curated roadmaps, comprehensive notes, and expert guidance
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar
            placeholder="Search courses, notes, or roadmaps…"
            //onSearch={handleSearch}
            onResultSelect={handleResultSelect}
            showFilters={true}
            className="w-full"
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate('/roadmaps-catalog')}
            iconName="Map"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Explore Roadmaps
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/notes-repository')}
            iconName="BookOpen"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Browse Notes
          </Button>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-cyan-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </div>
    </section>
  );
};

export default HeroSection;