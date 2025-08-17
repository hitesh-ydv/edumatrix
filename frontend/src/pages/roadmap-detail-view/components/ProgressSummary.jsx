import React from 'react';
import Icon from '../../../components/AppIcon';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const ProgressSummary = ({ roadmap, completedSteps, totalSteps, onStepClick }) => {
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
  
  const quickStats = [
    {
      label: 'Total Steps',
      value: totalSteps,
      icon: 'List',
      color: 'text-primary'
    },
    {
      label: 'Completed',
      value: completedSteps,
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      label: 'Remaining',
      value: totalSteps - completedSteps,
      icon: 'Clock',
      color: 'text-warning'
    },
    {
      label: 'Progress',
      value: `${progressPercentage}%`,
      icon: 'TrendingUp',
      color: 'text-accent'
    }
  ];

  const stepNavigation = roadmap?.steps?.map((step, index) => ({
    label: `Step ${index + 1}`,
    description: step?.title,
    completed: index < completedSteps,
    current: index === completedSteps
  }));

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="BarChart3" size={20} />
          Progress Overview
        </h3>
        
        <div className="mb-6">
          <ProgressIndicator
            steps={stepNavigation}
            currentStep={completedSteps}
            variant="circular"
            showLabels={false}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {quickStats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-muted mb-2 ${stat?.color}`}>
                <Icon name={stat?.icon} size={16} />
              </div>
              <div className="text-lg font-semibold text-foreground">{stat?.value}</div>
              <div className="text-xs text-muted-foreground">{stat?.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Navigation */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Navigation" size={20} />
          Quick Navigation
        </h3>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {roadmap?.steps?.map((step, index) => (
            <button
              key={index}
              onClick={() => onStepClick(index)}
              className={`w-full text-left p-3 rounded-lg transition-colors duration-150 ${
                index < completedSteps 
                  ? 'bg-success/10 text-success hover:bg-success/20' 
                  : index === completedSteps
                  ? 'bg-primary/10 text-primary hover:bg-primary/20' :'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon 
                  name={index < completedSteps ? 'CheckCircle' : index === completedSteps ? 'PlayCircle' : 'Circle'} 
                  size={16} 
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    Step {index + 1}: {step?.title}
                  </div>
                  <div className="text-xs opacity-80 truncate">
                    {step?.estimatedTime}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Related Roadmaps */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="GitBranch" size={20} />
          Related Roadmaps
        </h3>
        
        <div className="space-y-3">
          {roadmap?.relatedRoadmaps?.map((related, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-150 cursor-pointer">
              <div className="p-2 bg-primary/10 rounded-md">
                <Icon name="Map" size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">
                  {related?.title}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {related?.difficulty} • {related?.duration}
                </div>
              </div>
              <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;