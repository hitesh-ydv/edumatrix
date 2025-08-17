import React, { useState } from 'react';
import SearchBar from '../../../components/ui/SearchBar';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SearchAndFilter = ({ 
  searchQuery, 
  onSearchChange, 
  filters, 
  onFiltersChange,
  onClearFilters,
  activeFilter 
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Any Duration' },
    { value: 'short', label: 'Under 4 weeks' },
    { value: 'medium', label: '1-3 months' },
    { value: 'long', label: '3+ months' }
  ];

  const categoryOptions = activeFilter === 'semester' ? [
    { value: 'all', label: 'All Semesters' },
    { value: 'sem1', label: 'Semester 1' },
    { value: 'sem2', label: 'Semester 2' },
    { value: 'sem3', label: 'Semester 3' },
    { value: 'sem4', label: 'Semester 4' },
    { value: 'sem5', label: 'Semester 5' },
    { value: 'sem6', label: 'Semester 6' },
    { value: 'sem7', label: 'Semester 7' },
    { value: 'sem8', label: 'Semester 8' }
  ] : [
    { value: 'all', label: 'All Skills' },
    { value: 'programming', label: 'Programming' },
    { value: 'web-dev', label: 'Web Development' },
    { value: 'mobile-dev', label: 'Mobile Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'ai-ml', label: 'AI/ML' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'devops', label: 'DevOps' }
  ];

  const handleSearchResults = (query, results) => {
    onSearchChange(query);
  };

  const hasActiveFilters = () => {
    return filters?.difficulty !== 'all' || 
           filters?.duration !== 'all' || 
           filters?.category !== 'all';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-elevation-1">
      <div className="space-y-4">
        {/* Search Bar */}
        <SearchBar
          placeholder={`Search ${activeFilter === 'semester' ? 'semester-wise' : 'skill-based'} roadmaps...`}
          onSearch={handleSearchResults}
          searchScope="roadmaps"
          className="w-full"
         
        />

        {/* Quick Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={categoryOptions}
            value={filters?.category}
            onChange={(value) => onFiltersChange({ ...filters, category: value })}
            placeholder={activeFilter === 'semester' ? 'Select semester' : 'Select skill'}
            className="flex-1"
          />
          
          <Select
            options={difficultyOptions}
            value={filters?.difficulty}
            onChange={(value) => onFiltersChange({ ...filters, difficulty: value })}
            placeholder="Difficulty level"
            className="flex-1"
          />
          
          <Select
            options={durationOptions}
            value={filters?.duration}
            onChange={(value) => onFiltersChange({ ...filters, duration: value })}
            placeholder="Duration"
            className="flex-1"
          />
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            iconName={showAdvancedFilters ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            Advanced Filters
          </Button>
          
          {hasActiveFilters() && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="border-t border-border pt-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Rating
                </label>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0]?.map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-border text-primary focus:ring-primary"
                        checked={filters?.rating?.includes(rating)}
                        onChange={(e) => {
                          const currentRatings = filters?.rating || [];
                          const newRatings = e?.target?.checked
                            ? [...currentRatings, rating]
                            : currentRatings?.filter(r => r !== rating);
                          onFiltersChange({ ...filters, rating: newRatings });
                        }}
                      />
                      <span className="ml-2 text-sm text-foreground flex items-center">
                        <Icon name="Star" size={14} className="text-warning fill-current mr-1" />
                        {rating}+ stars
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Enrollment
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'popular', label: '1000+ students', min: 1000 },
                    { value: 'trending', label: '500+ students', min: 500 },
                    { value: 'new', label: 'Under 100 students', max: 100 }
                  ]?.map((option) => (
                    <label key={option?.value} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-border text-primary focus:ring-primary"
                        checked={filters?.enrollment?.includes(option?.value)}
                        onChange={(e) => {
                          const currentEnrollment = filters?.enrollment || [];
                          const newEnrollment = e?.target?.checked
                            ? [...currentEnrollment, option?.value]
                            : currentEnrollment?.filter(e => e !== option?.value);
                          onFiltersChange({ ...filters, enrollment: newEnrollment });
                        }}
                      />
                      <span className="ml-2 text-sm text-foreground">
                        {option?.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Features
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'certificates', label: 'Certificates' },
                    { value: 'projects', label: 'Hands-on Projects' },
                    { value: 'mentorship', label: 'Mentorship' },
                    { value: 'community', label: 'Community Support' }
                  ]?.map((feature) => (
                    <label key={feature?.value} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-border text-primary focus:ring-primary"
                        checked={filters?.features?.includes(feature?.value)}
                        onChange={(e) => {
                          const currentFeatures = filters?.features || [];
                          const newFeatures = e?.target?.checked
                            ? [...currentFeatures, feature?.value]
                            : currentFeatures?.filter(f => f !== feature?.value);
                          onFiltersChange({ ...filters, features: newFeatures });
                        }}
                      />
                      <span className="ml-2 text-sm text-foreground">
                        {feature?.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;