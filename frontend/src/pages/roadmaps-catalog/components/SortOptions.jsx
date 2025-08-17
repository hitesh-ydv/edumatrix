import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SortOptions = ({ sortBy, onSortChange, viewMode, onViewModeChange }) => {
  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'duration', label: 'Duration (Shortest First)' },
    { value: 'difficulty', label: 'Difficulty (Easiest First)' },
    { value: 'recent', label: 'Recently Added' },
    { value: 'alphabetical', label: 'Alphabetical' }
  ];

  const viewModes = [
    { id: 'grid', icon: 'Grid3X3', tooltip: 'Grid View' },
    { id: 'list', icon: 'List', tooltip: 'List View' }
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center space-x-4">
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={onSortChange}
          placeholder="Sort by..."
          className="w-48"
        />
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground hidden sm:block">View:</span>
        {viewModes?.map((mode) => (
          <button
            key={mode?.id}
            onClick={() => onViewModeChange(mode?.id)}
            className={`p-2 rounded-md transition-colors duration-150 ${
              viewMode === mode?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
            title={mode?.tooltip}
          >
            <Icon name={mode?.icon} size={16} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortOptions;