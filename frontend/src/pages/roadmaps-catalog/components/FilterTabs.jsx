import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterTabs = ({ activeFilter, onFilterChange, resultCount }) => {
  const filters = [
    {
      id: 'semester',
      label: 'Semester-wise',
      icon: 'Calendar',
      description: 'Organized by academic semesters'
    },
    {
      id: 'skill',
      label: 'Skill-based',
      icon: 'Target',
      description: 'Focused on specific technologies'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-elevation-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          {filters?.map((filter) => (
            <Button
              key={filter?.id}
              variant={activeFilter === filter?.id ? "default" : "outline"}
              onClick={() => onFilterChange(filter?.id)}
              iconName={filter?.icon}
              iconPosition="left"
              className="justify-start sm:justify-center"
            >
              {filter?.label}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="Filter" size={16} className="mr-2" />
          <span>{resultCount} roadmaps found</span>
        </div>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">
        {activeFilter === 'semester' && "Browse roadmaps organized by academic semesters and curriculum structure"}
        {activeFilter === 'skill' && "Explore roadmaps focused on specific technologies and skill development"}
      </div>
    </div>
  );
};

export default FilterTabs;