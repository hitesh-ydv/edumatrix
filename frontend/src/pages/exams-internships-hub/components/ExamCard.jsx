import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExamCard = ({ exam, onSyllabusDownload, onViewDetails }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getExamTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'competitive': return 'Trophy';
      case 'placement': return 'Briefcase';
      case 'certification': return 'Award';
      default: return 'GraduationCap';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={getExamTypeIcon(exam?.type)} size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{exam?.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exam?.difficulty)}`}>
                {exam?.difficulty}
              </span>
              <span className="text-xs text-muted-foreground">{exam?.type}</span>
            </div>
          </div>
        </div>
        {exam?.isPopular && (
          <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            Popular
          </div>
        )}
      </div>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
        {exam?.description}
      </p>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Duration:</span>
          <span className="text-foreground font-medium">{exam?.duration}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Application Fee:</span>
          <span className="text-foreground font-medium">{exam?.fee}</span>
        </div>
        {exam?.nextExamDate && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Next Exam:</span>
            <span className="text-foreground font-medium">{exam?.nextExamDate}</span>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSyllabusDownload(exam)}
          iconName="Download"
          iconPosition="left"
          className="flex-1"
        >
          Syllabus
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onViewDetails(exam)}
          iconName="ExternalLink"
          iconPosition="right"
          className="flex-1"
        >
          View Details
        </Button>
      </div>
      {exam?.preparationTips && exam?.preparationTips?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-2">Quick Tips:</h4>
          <ul className="space-y-1">
            {exam?.preparationTips?.slice(0, 2)?.map((tip, index) => (
              <li key={index} className="flex items-start space-x-2 text-xs text-muted-foreground">
                <Icon name="CheckCircle" size={12} className="text-success mt-0.5 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExamCard;