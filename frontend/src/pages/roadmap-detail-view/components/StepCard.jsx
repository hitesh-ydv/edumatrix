import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const StepCard = ({ step, stepIndex, isCompleted, isActive, onToggleComplete, onBookmarkResource, onAddNote }) => {
  const [isExpanded, setIsExpanded] = useState(isActive);
  const [notes, setNotes] = useState(step?.notes || '');
  const [showNoteEditor, setShowNoteEditor] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSaveNote = () => {
    onAddNote(stepIndex, notes);
    setShowNoteEditor(false);
  };

  const getResourceIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'video': return 'Play';
      case 'article': return 'FileText';
      case 'practice': return 'Code';
      case 'quiz': return 'HelpCircle';
      case 'project': return 'Folder';
      default: return 'Link';
    }
  };

  const getResourceColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'video': return 'text-red-500 bg-red-50';
      case 'article': return 'text-blue-500 bg-blue-50';
      case 'practice': return 'text-green-500 bg-green-50';
      case 'quiz': return 'text-purple-500 bg-purple-50';
      case 'project': return 'text-orange-500 bg-orange-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className={`bg-card rounded-lg border transition-all duration-200 ${
      isActive ? 'border-primary shadow-elevation-2' : 
      isCompleted ? 'border-success/30 bg-success/5': 'border-border shadow-elevation-1'
    }`}>
      {/* Step Header */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <Checkbox
              checked={isCompleted}
              onChange={(e) => onToggleComplete(stepIndex, e?.target?.checked)}
              size="lg"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className={`text-lg font-semibold ${
                isCompleted ? 'text-success line-through' : 'text-foreground'
              }`}>
                Step {stepIndex + 1}: {step?.title}
              </h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span className="text-sm">{step?.estimatedTime}</span>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {step?.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {step?.difficulty && (
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                    step?.difficulty === 'Easy' ? 'text-success bg-success/10' :
                    step?.difficulty === 'Medium'? 'text-warning bg-warning/10' : 'text-error bg-error/10'
                  }`}>
                    {step?.difficulty}
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  {step?.resources?.length} resources
                </span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleExpand}
                iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
              >
                {isExpanded ? 'Collapse' : 'Expand'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border">
          <div className="pt-6 space-y-6">
            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Icon name="BookOpen" size={16} />
                Learning Resources
              </h4>
              
              <div className="grid gap-3">
                {step?.resources?.map((resource, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-150">
                    <div className={`p-2 rounded-md ${getResourceColor(resource?.type)}`}>
                      <Icon name={getResourceIcon(resource?.type)} size={16} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h5 className="text-sm font-medium text-foreground truncate">
                          {resource?.title}
                        </h5>
                        {resource?.isExternal && (
                          <Icon name="ExternalLink" size={12} className="text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground capitalize">
                          {resource?.type}
                        </span>
                        {resource?.duration && (
                          <>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              {resource?.duration}
                            </span>
                          </>
                        )}
                        {resource?.platform && (
                          <>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              {resource?.platform}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onBookmarkResource(stepIndex, index)}
                        className="h-8 w-8"
                      >
                        <Icon 
                          name={resource?.isBookmarked ? "BookmarkCheck" : "Bookmark"} 
                          size={14}
                          className={resource?.isBookmarked ? "text-primary" : "text-muted-foreground"}
                        />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(resource?.url, '_blank')}
                        iconName="ExternalLink"
                        iconPosition="right"
                      >
                        Open
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            {step?.prerequisites && step?.prerequisites?.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="AlertCircle" size={16} />
                  Prerequisites
                </h4>
                
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <ul className="space-y-2">
                    {step?.prerequisites?.map((prereq, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Icon name="ArrowRight" size={14} className="text-warning mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Notes Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Icon name="StickyNote" size={16} />
                  Personal Notes
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNoteEditor(!showNoteEditor)}
                  iconName={showNoteEditor ? "X" : "Edit3"}
                  iconPosition="left"
                >
                  {showNoteEditor ? 'Cancel' : 'Edit'}
                </Button>
              </div>
              
              {showNoteEditor ? (
                <div className="space-y-3">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e?.target?.value)}
                    placeholder="Add your personal notes for this step..."
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={4}
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleSaveNote}
                      iconName="Save"
                      iconPosition="left"
                    >
                      Save Note
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNoteEditor(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-muted/30 rounded-lg p-4 min-h-16">
                  {notes ? (
                    <p className="text-sm text-foreground whitespace-pre-wrap">{notes}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No notes added yet. Click Edit to add your thoughts and insights.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepCard;