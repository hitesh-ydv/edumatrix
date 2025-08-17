import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Input from './Input';
import Button from './Button';

const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  onResultSelect,
  searchScope = 'all',
  className = "",
  showFilters = false,
  autoFocus = false
}) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  const searchFilters = [
    { value: 'all', label: 'All', icon: 'Search' },
    { value: 'roadmaps', label: 'Roadmaps', icon: 'Map' },
    { value: 'notes', label: 'Notes', icon: 'BookOpen' },
    { value: 'exams', label: 'Exams', icon: 'GraduationCap' },
    { value: 'internships', label: 'Internships', icon: 'Briefcase' }
  ];

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/search?q=${query}`);
        const data = await response.json();

        console.log(data)
        
        // Transform API data to match expected format
        const transformedResults = [];
        
        if (data.roadmaps && data.roadmaps.length > 0) {
          transformedResults.push(...data.roadmaps.map(item => ({
            ...item,
          })));
        }
        
        if (data.notes && data.notes.length > 0) {
          transformedResults.push(...data.notes.map(item => ({
            ...item,
          })));
        }
        
        if (data.exams && data.exams.length > 0) {
          transformedResults.push(...data.exams.map(item => ({
            ...item,
          })));
        }

        if (data.syllabuses && data.syllabuses.length > 0) {
          transformedResults.push(...data.syllabuses.map(item => ({
            ...item,
          })));
        }
        if (data.internships && data.internships.length > 0) {
          transformedResults.push(...data.internships.map(item => ({
            ...item,
          })));
        }
        
        setResults(transformedResults);
        setIsLoading(false);

        if (onSearch) {
          onSearch(query, transformedResults);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setIsLoading(false);
      }
    };

    // Debounce the API call
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  };

  const handleResultClick = (result) => {
    if (onResultSelect) {
      onResultSelect(result);
    }
    setQuery(result.title);
    setResults([]);
    setIsExpanded(false);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = (e) => {
    setTimeout(() => {
      if (!searchRef.current.contains(document.activeElement)) {
        setIsExpanded(false);
      }
    }, 150);
  };

  useEffect(() => {
    if (autoFocus && searchRef.current) {
      searchRef.current.focus();
    }
  }, [autoFocus]);

  const getResultIcon = (type) => {
    switch (type) {
      case 'roadmap': return 'Map';
      case 'notes': return 'BookOpen';
      case 'exam': return 'GraduationCap';
      default: return 'FileText';
    }
  };

  // Filter results based on selected filter
  const filteredResults = selectedFilter === 'all' 
    ? results 
    : results.filter(item => item.type === selectedFilter || 
                           (selectedFilter === 'notes' && item.type === 'notes') ||
                           (selectedFilter === 'exams' && item.type === 'exam') ||
                           (selectedFilter === 'roadmaps' && item.type === 'roadmaps'));

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Input
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full pl-10 pr-4"
            autoComplete="off"
            ref={searchRef}
          />
          <Icon
            name="Search"
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
            </div>
          )}
        </div>

        {showFilters && (
          <div className="flex items-center space-x-2 mt-3">
            <span className="text-sm text-muted-foreground">Filter:</span>
            <div className="flex items-center space-x-1">
              {searchFilters.map((filter) => (
                <Button
                  key={filter.value}
                  type="button"
                  variant={selectedFilter === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange(filter.value)}
                  className="flex items-center space-x-1"
                >
                  <Icon name={filter.icon} size={14} />
                  <span>{filter.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </form>
      
      {/* Search Results Dropdown */}
      {isExpanded && (query.trim() || filteredResults.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevation-2 z-50 max-h-96 overflow-y-auto animate-scale-in">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                <span className="text-sm text-muted-foreground">Searching...</span>
              </div>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="py-2">
              {filteredResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-150 flex items-start space-x-3"
                >
                  <Icon
                    name={getResultIcon(result.type)}
                    size={16}
                    className="text-muted-foreground mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {result.title || result.position || result.name}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {result.description}
                    </div>
                    <div className="text-xs text-muted-foreground/80 mt-1 capitalize">
                      {result.type}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query.trim() && (
            <div className="p-4 text-center text-muted-foreground">
              <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs mt-1">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;