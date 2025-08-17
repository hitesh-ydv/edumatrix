import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isOpen, 
  onClose,
  className = "" 
}) => {
  const fileTypes = [
    { value: 'pdf', label: 'PDF Documents', count: 45 },
    { value: 'doc', label: 'Word Documents', count: 23 },
    { value: 'ppt', label: 'Presentations', count: 12 }
  ];

  const subjects = [
    { value: 'data-structures', label: 'Data Structures', count: 18 },
    { value: 'algorithms', label: 'Algorithms', count: 15 },
    { value: 'operating-systems', label: 'Operating Systems', count: 12 },
    { value: 'database-management', label: 'Database Management', count: 14 },
    { value: 'computer-networks', label: 'Computer Networks', count: 10 },
    { value: 'software-engineering', label: 'Software Engineering', count: 8 },
    { value: 'machine-learning', label: 'Machine Learning', count: 6 },
    { value: 'web-development', label: 'Web Development', count: 9 }
  ];

  const semesters = [
    { value: '1', label: '1st Semester', count: 8 },
    { value: '2', label: '2nd Semester', count: 10 },
    { value: '3', label: '3rd Semester', count: 12 },
    { value: '4', label: '4th Semester', count: 15 },
    { value: '5', label: '5th Semester', count: 14 },
    { value: '6', label: '6th Semester', count: 13 },
    { value: '7', label: '7th Semester', count: 9 },
    { value: '8', label: '8th Semester', count: 7 }
  ];

  const handleFilterToggle = (category, value) => {
    const currentFilters = filters?.[category] || [];
    const newFilters = currentFilters?.includes(value)
      ? currentFilters?.filter(item => item !== value)
      : [...currentFilters, value];
    
    onFilterChange(category, newFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters)?.reduce((total, filterArray) => total + filterArray?.length, 0);
  };

  const FilterSection = ({ title, items, category, icon }) => (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <Icon name={icon} size={16} className="text-muted-foreground" />
        <h3 className="font-medium text-foreground text-sm">{title}</h3>
      </div>
      <div className="space-y-2">
        {items?.map((item) => (
          <div key={item?.value} className="flex items-center justify-between">
            <Checkbox
              label={item?.label}
              checked={filters?.[category]?.includes(item?.value) || false}
              onChange={() => handleFilterToggle(category, item?.value)}
              size="sm"
            />
            <span className="text-xs text-muted-foreground">
              {item?.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-card border-r border-border shadow-elevation-2 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <FilterContent />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className={`hidden lg:block w-64 ${className}`}>
        <div className="bg-card border border-border rounded-lg p-4">
          <FilterContent />
        </div>
      </div>
    </>
  );

  function FilterContent() {
    return (
      <>
        {/* Filter Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="font-medium text-foreground text-sm">
              Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
            </span>
          </div>
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          )}
        </div>
        {/* Filter Sections */}
        <FilterSection
          title="File Type"
          items={fileTypes}
          category="fileTypes"
          icon="FileType"
        />
        <FilterSection
          title="Subject"
          items={subjects}
          category="subjects"
          icon="BookOpen"
        />
        <FilterSection
          title="Semester"
          items={semesters}
          category="semesters"
          icon="GraduationCap"
        />
        {/* Active Filters */}
        {getActiveFiltersCount() > 0 && (
          <div className="pt-4 border-t border-border">
            <h3 className="font-medium text-foreground text-sm mb-3">Active Filters</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters)?.map(([category, values]) =>
                values?.map((value) => (
                  <span
                    key={`${category}-${value}`}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                  >
                    <span>{value?.replace('-', ' ')}</span>
                    <button
                      onClick={() => handleFilterToggle(category, value)}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <Icon name="X" size={10} />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>
        )}
      </>
    );
  }
};

export default FilterSidebar;