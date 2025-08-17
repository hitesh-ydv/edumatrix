import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoadmapHeader = ({ roadmap, onDownloadPDF }) => {
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'text-success bg-success/10';
      case 'intermediate': return 'text-warning bg-warning/10';
      case 'advanced': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Map" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                {roadmap?.title}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(roadmap?.difficulty)}`}>
                  {roadmap?.difficulty}
                </span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span className="text-sm">{roadmap?.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Icon name="Users" size={16} />
                  <span className="text-sm">{roadmap?.enrolledCount} enrolled</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground leading-relaxed mb-4">
            {roadmap?.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {roadmap?.tags?.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
          <Button
            variant="default"
            onClick={onDownloadPDF}
            iconName="Download"
            iconPosition="left"
            className="whitespace-nowrap"
          >
            Download as PDF
          </Button>
          <Button
            variant="outline"
            iconName="Share2"
            iconPosition="left"
            className="whitespace-nowrap"
          >
            Share Roadmap
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapHeader;