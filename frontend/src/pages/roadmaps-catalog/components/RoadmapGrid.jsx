import React from 'react';
import RoadmapCard from './RoadmapCard';

const RoadmapGrid = ({ roadmaps, viewMode, loading }) => {
  if (loading) {
    return (
      <div className={`grid gap-6 ${
        viewMode === 'list' ?'grid-cols-1' :'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      }`}>
        {Array.from({ length: 6 })?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg overflow-hidden shadow-elevation-1">
            {viewMode === 'grid' && (
              <div className="w-full h-48 bg-muted animate-pulse" />
            )}
            <div className="p-4">
              <div className="h-6 bg-muted rounded animate-pulse mb-2" />
              <div className="h-4 bg-muted rounded animate-pulse mb-2 w-3/4" />
              <div className="h-4 bg-muted rounded animate-pulse mb-4 w-1/2" />
              <div className="h-10 bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (roadmaps?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No roadmaps found</h3>
        <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${
      viewMode === 'list' ?'grid-cols-1' :'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    }`}>
      {roadmaps?.map((roadmap) => (
        <RoadmapCard
          key={roadmap?.id}
          roadmap={roadmap}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default RoadmapGrid;