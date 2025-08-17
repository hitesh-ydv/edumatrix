import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RoadmapCard = ({ roadmap, viewMode = 'grid' }) => {
  const navigate = useNavigate();

  const handleViewSteps = () => {
    navigate('/roadmap-detail-view', { state: { roadmap } });
  };

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'bg-success text-success-foreground';
      case 'intermediate': return 'bg-warning text-warning-foreground';
      case 'advanced': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-primary';
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0">
            <Image
              src={roadmap?.thumbnail}
              alt={roadmap?.title}
              className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-md"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
                  {roadmap?.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(roadmap?.difficulty)}`}>
                    {roadmap?.difficulty}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Icon name="Clock" size={14} className="mr-1" />
                    {roadmap?.duration}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Icon name="Users" size={14} className="mr-1" />
                    {roadmap?.enrolled}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icon name="Star" size={14} className="mr-1 text-warning fill-current" />
                  {roadmap?.rating}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {roadmap?.description}
            </p>
            
            {roadmap?.progress !== undefined && (
              <div className="mb-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{roadmap?.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(roadmap?.progress)}`}
                    style={{ width: `${roadmap?.progress}%` }}
                  />
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {roadmap?.tags?.slice(0, 2)?.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                    {tag}
                  </span>
                ))}
                {roadmap?.tags?.length > 2 && (
                  <span className="text-xs text-muted-foreground">
                    +{roadmap?.tags?.length - 2} more
                  </span>
                )}
              </div>
              
              <Button
                variant="default"
                size="sm"
                onClick={handleViewSteps}
                iconName="ArrowRight"
                iconPosition="right"
              >
                View Steps
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 group">
      <div className="relative">
        <Image
          src={roadmap?.thumbnail}
          alt={roadmap?.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(roadmap?.difficulty)}`}>
            {roadmap?.difficulty}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
          <div className="flex items-center text-xs text-foreground">
            <Icon name="Star" size={12} className="mr-1 text-warning fill-current" />
            {roadmap?.rating}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-150">
          {roadmap?.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
          {roadmap?.description}
        </p>
        
        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Icon name="Clock" size={14} className="mr-1" />
            {roadmap?.duration}
          </div>
          <div className="flex items-center">
            <Icon name="Users" size={14} className="mr-1" />
            {roadmap?.enrolled}
          </div>
        </div>
        
        {roadmap?.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Your Progress</span>
              <span>{roadmap?.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(roadmap?.progress)}`}
                style={{ width: `${roadmap?.progress}%` }}
              />
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-4">
          {roadmap?.tags?.slice(0, 3)?.map((tag, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
              {tag}
            </span>
          ))}
          {roadmap?.tags?.length > 3 && (
            <span className="px-2 py-1 text-xs text-muted-foreground">
              +{roadmap?.tags?.length - 3}
            </span>
          )}
        </div>
        
        <Button
          variant="default"
          fullWidth
          onClick={handleViewSteps}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View Steps
        </Button>
      </div>
    </div>
  );
};

export default RoadmapCard;