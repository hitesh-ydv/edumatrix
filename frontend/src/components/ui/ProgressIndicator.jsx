import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  steps = [], 
  currentStep = 0, 
  variant = 'horizontal',
  showLabels = true,
  showPercentage = false,
  className = ""
}) => {
  const totalSteps = steps?.length;
  const completedSteps = currentStep;
  const progressPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') return 'CheckCircle';
    if (step?.icon) return step?.icon;
    return 'Circle';
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'current': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getConnectorColor = (stepIndex) => {
    return stepIndex < currentStep ? 'bg-success' : 'bg-border';
  };

  if (variant === 'circular') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/20"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
              className="text-primary transition-all duration-300 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-semibold text-foreground">
              {progressPercentage}%
            </span>
          </div>
        </div>
        {showLabels && (
          <div className="mt-4 text-center">
            <div className="text-sm font-medium text-foreground">
              {completedSteps} of {totalSteps} completed
            </div>
            {steps?.[currentStep] && (
              <div className="text-xs text-muted-foreground mt-1">
                Current: {steps?.[currentStep]?.label}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {showPercentage && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground font-medium">Progress</span>
              <span className="text-muted-foreground">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
        {steps?.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === steps?.length - 1;
          
          return (
            <div key={index} className="relative flex items-start">
              {/* Connector line */}
              {!isLast && (
                <div className="absolute left-3 top-8 w-0.5 h-8 transition-colors duration-300">
                  <div className={`w-full h-full ${getConnectorColor(index)}`} />
                </div>
              )}
              {/* Step indicator */}
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                status === 'completed' ? 'bg-success text-success-foreground' :
                status === 'current' ? 'bg-primary text-primary-foreground' :
                'bg-muted text-muted-foreground'
              }`}>
                <Icon 
                  name={getStepIcon(step, status)} 
                  size={14}
                  className={status === 'completed' || status === 'current' ? '' : 'opacity-60'}
                />
              </div>
              {/* Step content */}
              {showLabels && (
                <div className="ml-4 flex-1 min-w-0">
                  <div className={`text-sm font-medium ${
                    status === 'current' ? 'text-foreground' : 
                    status === 'completed' ? 'text-foreground' : 
                    'text-muted-foreground'
                  }`}>
                    {step?.label}
                  </div>
                  {step?.description && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {step?.description}
                    </div>
                  )}
                  {step?.duration && (
                    <div className="text-xs text-muted-foreground/80 mt-1">
                      {step?.duration}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`w-full ${className}`}>
      {showPercentage && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-foreground font-medium">Progress</span>
            <span className="text-muted-foreground">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === steps?.length - 1;
          
          return (
            <div key={index} className="flex items-center flex-1">
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  status === 'completed' ? 'bg-success text-success-foreground' :
                  status === 'current' ? 'bg-primary text-primary-foreground' :
                  'bg-muted text-muted-foreground'
                }`}>
                  <Icon 
                    name={getStepIcon(step, status)} 
                    size={16}
                    className={status === 'completed' || status === 'current' ? '' : 'opacity-60'}
                  />
                </div>
                
                {showLabels && (
                  <div className="mt-2 text-center max-w-20">
                    <div className={`text-xs font-medium ${getStepColor(status)}`}>
                      {step?.label}
                    </div>
                    {step?.duration && (
                      <div className="text-xs text-muted-foreground/80 mt-1">
                        {step?.duration}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Connector line */}
              {!isLast && (
                <div className="flex-1 h-0.5 mx-4 transition-colors duration-300">
                  <div className={`w-full h-full ${getConnectorColor(index)}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;