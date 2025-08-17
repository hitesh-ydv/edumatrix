import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const NotesCard = ({ note, onDownload }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      if (onDownload) {
        await onDownload(note);
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

  const getFileIcon = (fileType) => {
    switch (fileType?.toLowerCase()) {
      case 'pdf': return 'FileText';
      case 'doc': case'docx': return 'FileType';
      case 'ppt': case'pptx': return 'Presentation';
      default: return 'File';
    }
  };

  const getFileTypeColor = (fileType) => {
    switch (fileType?.toLowerCase()) {
      case 'pdf': return 'text-red-600 bg-red-50';
      case 'doc': case'docx': return 'text-blue-600 bg-blue-50';
      case 'ppt': case'pptx': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
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
      {/* Header with preview thumbnail */}
      <div className="flex items-start space-x-3 mb-3">
        {note?.thumbnail ? (
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={note?.thumbnail}
              alt={`${note?.title} preview`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            <Icon name={getFileIcon(note?.fileType)} size={20} className="text-muted-foreground" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm md:text-base line-clamp-2 mb-1">
            {note?.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {note?.subject}
          </p>
        </div>
      </div>
      {/* File details */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getFileTypeColor(note?.fileType)}`}>
            {note?.fileType?.toUpperCase()}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatFileSize(note?.fileSize)}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatDate(note?.uploadDate)}
        </span>
      </div>
      {/* Description */}
      {note?.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {note?.description}
        </p>
      )}
      {/* Footer with semester and download */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="BookOpen" size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Semester {note?.semester}
          </span>
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
          {isDownloading ? 'Downloading...' : 'Download'}
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

export default NotesCard;