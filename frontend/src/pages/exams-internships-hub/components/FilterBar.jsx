import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import SearchBar from '../../../components/ui/SearchBar';

const FilterBar = ({ 
  activeTab, 
  onTabChange, 
  searchQuery, 
  onSearchChange, 
  filters, 
  onFilterChange, 
  onClearFilters,
  className = "" 
}) => {
  const tabs = [
    { id: 'exams', label: 'Competitive Exams', icon: 'GraduationCap' },
    { id: 'internships', label: 'Internships', icon: 'Briefcase' }
  ];

  const examFilters = [
    {
      value: 'all',
      label: 'All Exams',
      options: [
        { value: 'all', label: 'All Types' },
        { value: 'competitive', label: 'Competitive' },
        { value: 'placement', label: 'Placement' },
        { value: 'certification', label: 'Certification' }
      ]
    },
    {
      value: 'difficulty',
      label: 'Difficulty',
      options: [
        { value: 'all', label: 'All Levels' },
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' }
      ]
    }
  ];

  const internshipFilters = [
    {
      value: 'location',
      label: 'Location',
      options: [
        { value: 'all', label: 'All Locations' },
        { value: 'remote', label: 'Remote' },
        { value: 'bangalore', label: 'Bangalore' },
        { value: 'mumbai', label: 'Mumbai' },
        { value: 'delhi', label: 'Delhi' },
        { value: 'hyderabad', label: 'Hyderabad' },
        { value: 'pune', label: 'Pune' }
      ]
    },
    {
      value: 'duration',
      label: 'Duration',
      options: [
        { value: 'all', label: 'All Durations' },
        { value: '1-3', label: '1-3 months' },
        { value: '3-6', label: '3-6 months' },
        { value: '6+', label: '6+ months' }
      ]
    },
    {
      value: 'stipend',
      label: 'Stipend',
      options: [
        { value: 'all', label: 'All Ranges' },
        { value: 'unpaid', label: 'Unpaid' },
        { value: '5000-15000', label: '₹5,000 - ₹15,000' },
        { value: '15000-30000', label: '₹15,000 - ₹30,000' },
        { value: '30000+', label: '₹30,000+' }
      ]
    }
  ];

  const currentFilters = activeTab === 'exams' ? examFilters : internshipFilters;
  const hasActiveFilters = Object.values(filters)?.some(value => value !== 'all' && value !== '');

  return (
    <div className={`bg-card border border-border rounded-lg p-6 shadow-elevation-1 ${className}`}>
      {/* Tab Navigation */}
      <div className="flex items-center space-x-1 mb-6 bg-muted p-1 rounded-lg">
        {tabs?.map((tab) => (
          <Button
            key={tab?.id}
            variant={activeTab === tab?.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange(tab?.id)}
            iconName={tab?.icon}
            iconPosition="left"
            className="flex-1 justify-center"
          >
            {tab?.label}
          </Button>
        ))}
      </div>
      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          placeholder={`Search ${activeTab === 'exams' ? 'exams' : 'internships'}...`}
          onSearch={onSearchChange}
          searchScope={activeTab}
          className="w-full"
        />
      </div>
      {/* Filter Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground flex items-center space-x-2">
            <Icon name="Filter" size={16} />
            <span>Filters</span>
          </h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentFilters?.map((filter) => (
            <Select
              key={filter?.value}
              label={filter?.label}
              options={filter?.options}
              value={filters?.[filter?.value] || 'all'}
              onChange={(value) => onFilterChange(filter?.value, value)}
              className="w-full"
            />
          ))}
        </div>
      </div>
      {/* Quick Filters */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Quick Filters</h4>
        <div className="flex flex-wrap gap-2">
          {activeTab === 'exams' ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onFilterChange('all', 'competitive')}
                iconName="Trophy"
                iconPosition="left"
              >
                Competitive Only
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onFilterChange('difficulty', 'easy')}
                iconName="TrendingUp"
                iconPosition="left"
              >
                Beginner Friendly
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onFilterChange('all', 'placement')}
                iconName="Briefcase"
                iconPosition="left"
              >
                Placement Exams
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onFilterChange('location', 'remote')}
                iconName="Wifi"
                iconPosition="left"
              >
                Remote Only
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onFilterChange('stipend', '15000-30000')}
                iconName="IndianRupee"
                iconPosition="left"
              >
                Good Stipend
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onFilterChange('duration', '3-6')}
                iconName="Clock"
                iconPosition="left"
              >
                3-6 Months
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;