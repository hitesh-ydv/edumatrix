import React from 'react';
import StepCard from './StepCard';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';



const StepsList = ({ 
  roadmap, 
  completedSteps, 
  onToggleStepComplete, 
  onBookmarkResource, 
  onAddNote,
  activeStepIndex 
}) => {
  const progressSteps = roadmap?.steps?.map((step, index) => ({
    label: `Step ${index + 1}`,
    description: step?.title,
    duration: step?.estimatedTime
  }));

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Learning Path Progress
        </h2>
        
        <ProgressIndicator
          steps={progressSteps}
          currentStep={completedSteps}
          variant="horizontal"
          showLabels={true}
          showPercentage={true}
        />
      </div>
      {/* Steps List */}
      <div className="space-y-4">
        {roadmap?.steps?.map((step, index) => (
          <StepCard
            key={index}
            step={step}
            stepIndex={index}
            isCompleted={index < completedSteps}
            isActive={index === activeStepIndex}
            onToggleComplete={onToggleStepComplete}
            onBookmarkResource={onBookmarkResource}
            onAddNote={onAddNote}
          />
        ))}
      </div>
      {/* Completion Message */}
      {completedSteps === roadmap?.steps?.length && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Trophy" size={32} className="text-success" />
          </div>
          <h3 className="text-xl font-semibold text-success mb-2">
            Congratulations! 🎉
          </h3>
          <p className="text-success/80 mb-4">
            You've successfully completed the {roadmap?.title} roadmap!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="default">
              Get Certificate
            </Button>
            <Button variant="outline">
              Share Achievement
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepsList;