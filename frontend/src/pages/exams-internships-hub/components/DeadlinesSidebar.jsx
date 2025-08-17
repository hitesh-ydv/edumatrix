import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeadlinesSidebar = ({ deadlines, onViewAll, className = "" }) => {
  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (days) => {
    if (days <= 3) return 'text-error bg-error/10 border-error/20';
    if (days <= 7) return 'text-warning bg-warning/10 border-warning/20';
    if (days <= 14) return 'text-accent bg-accent/10 border-accent/20';
    return 'text-muted-foreground bg-muted border-border';
  };

  const getUrgencyIcon = (days) => {
    if (days <= 3) return 'AlertTriangle';
    if (days <= 7) return 'Clock';
    return 'Calendar';
  };

  const sortedDeadlines = deadlines?.map(deadline => ({
      ...deadline,
      daysLeft: getDaysUntilDeadline(deadline?.date)
    }))?.filter(deadline => deadline?.daysLeft >= 0)?.sort((a, b) => a?.daysLeft - b?.daysLeft);

  return (
    <div className={`bg-card border border-border rounded-lg p-6 shadow-elevation-1 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Clock" size={20} className="text-primary" />
          <span>Upcoming Deadlines</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {sortedDeadlines?.slice(0, 6)?.map((deadline, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${getUrgencyColor(deadline?.daysLeft)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getUrgencyIcon(deadline?.daysLeft)} 
                  size={16} 
                  className="flex-shrink-0 mt-0.5"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-medium truncate">{deadline?.title}</h4>
                  <p className="text-xs opacity-80">{deadline?.type}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs font-medium">
                  {deadline?.daysLeft === 0 ? 'Today' : 
                   deadline?.daysLeft === 1 ? 'Tomorrow' : 
                   `${deadline?.daysLeft} days`}
                </div>
                <div className="text-xs opacity-70">{deadline?.date}</div>
              </div>
            </div>
            
            {deadline?.description && (
              <p className="text-xs opacity-80 line-clamp-2 mb-2">
                {deadline?.description}
              </p>
            )}
            
            {deadline?.actionUrl && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => window.open(deadline?.actionUrl, '_blank')}
                iconName="ExternalLink"
                iconPosition="right"
                className="w-full justify-center"
              >
                {deadline?.actionText || 'Apply Now'}
              </Button>
            )}
          </div>
        ))}
      </div>
      {sortedDeadlines?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-sm text-muted-foreground">No upcoming deadlines</p>
          <p className="text-xs text-muted-foreground/80 mt-1">Check back later for updates</p>
        </div>
      )}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Priority Legend:</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 rounded bg-error/20 border border-error/30"></div>
            <span className="text-muted-foreground">Critical (≤3 days)</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 rounded bg-warning/20 border border-warning/30"></div>
            <span className="text-muted-foreground">Urgent (≤7 days)</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 rounded bg-accent/20 border border-accent/30"></div>
            <span className="text-muted-foreground">Important (≤14 days)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeadlinesSidebar;