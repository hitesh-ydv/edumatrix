import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SyllabusCard = ({ syllabus, onDownload }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      if (onDownload) {
        await onDownload(syllabus);
      }
      // Simulate download delay
      setTimeout(() => {
        setIsDownloading(false);
      }, 2000);
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
            <Icon name="FileText" size={18} className="text-red-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">
              {syllabus?.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {syllabus?.description}
            </p>
          </div>
        </div>
      </div>
      {/* File details */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {syllabus?.academicYear}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="HardDrive" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {formatFileSize(syllabus?.fileSize)}
            </span>
          </div>
        </div>
        
        <span className="text-xs text-muted-foreground">
          Updated: {formatDate(syllabus?.lastUpdated)}
        </span>
      </div>
      {/* Semester info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
            Semester {syllabus?.semester}
          </span>
          {syllabus?.isOfficial && (
            <span className="px-2 py-1 rounded-md text-xs font-medium bg-success/10 text-success">
              Official
            </span>
          )}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          loading={isDownloading}
          iconName="Download"
          iconPosition="left"
          iconSize={14}
          className="text-xs"
        >
          {isDownloading ? 'Downloading...' : 'Download PDF'}
        </Button>
      </div>
      {/* Download progress indicator */}
      {isDownloading && (
        <div className="mt-3">
          <div className="w-full bg-muted rounded-full h-1">
            <div className="bg-primary h-1 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SyllabusCard;