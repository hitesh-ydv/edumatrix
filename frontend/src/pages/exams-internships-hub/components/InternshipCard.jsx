import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InternshipCard = ({ internship, onApply, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return 'text-success bg-success/10';
      case 'closing soon': return 'text-warning bg-warning/10';
      case 'closed': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilDeadline(internship?.deadline);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            <Image 
              src={internship?.companyLogo} 
              alt={`${internship?.company} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{internship?.position}</h3>
            <p className="text-sm text-muted-foreground">{internship?.company}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(internship?.status)}`}>
            {internship?.status}
          </span>
          {daysLeft > 0 && daysLeft <= 7 && (
            <span className="text-xs text-warning font-medium">
              {daysLeft} days left
            </span>
          )}
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="MapPin" size={14} className="text-muted-foreground" />
          <span className="text-muted-foreground">{internship?.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Clock" size={14} className="text-muted-foreground" />
          <span className="text-muted-foreground">{internship?.duration}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="IndianRupee" size={14} className="text-muted-foreground" />
          <span className="text-muted-foreground">{internship?.stipend}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Calendar" size={14} className="text-muted-foreground" />
          <span className="text-muted-foreground">Deadline: {internship?.deadline}</span>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Required Skills:</h4>
        <div className="flex flex-wrap gap-1">
          {internship?.skills?.slice(0, 4)?.map((skill, index) => (
            <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              {skill}
            </span>
          ))}
          {internship?.skills?.length > 4 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{internship?.skills?.length - 4} more
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(internship)}
          iconName="Eye"
          iconPosition="left"
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onApply(internship)}
          iconName="ExternalLink"
          iconPosition="right"
          className="flex-1"
          disabled={internship?.status === 'closed'}
        >
          Apply Now
        </Button>
      </div>
      {internship?.applicationTips && internship?.applicationTips?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-2">Application Tips:</h4>
          <ul className="space-y-1">
            {internship?.applicationTips?.slice(0, 2)?.map((tip, index) => (
              <li key={index} className="flex items-start space-x-2 text-xs text-muted-foreground">
                <Icon name="Lightbulb" size={12} className="text-accent mt-0.5 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InternshipCard;