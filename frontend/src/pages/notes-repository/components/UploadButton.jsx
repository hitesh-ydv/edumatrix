import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UploadButton = ({ isAdmin = false, onUpload }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    subject: '',
    semester: '',
    fileType: '',
    description: '',
    file: null
  });

  const subjectOptions = [
    { value: 'data-structures', label: 'Data Structures' },
    { value: 'algorithms', label: 'Algorithms' },
    { value: 'operating-systems', label: 'Operating Systems' },
    { value: 'database-management', label: 'Database Management' },
    { value: 'computer-networks', label: 'Computer Networks' },
    { value: 'software-engineering', label: 'Software Engineering' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'web-development', label: 'Web Development' }
  ];

  const semesterOptions = [
    { value: '1', label: '1st Semester' },
    { value: '2', label: '2nd Semester' },
    { value: '3', label: '3rd Semester' },
    { value: '4', label: '4th Semester' },
    { value: '5', label: '5th Semester' },
    { value: '6', label: '6th Semester' },
    { value: '7', label: '7th Semester' },
    { value: '8', label: '8th Semester' }
  ];

  const fileTypeOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'doc', label: 'Word Document' },
    { value: 'ppt', label: 'PowerPoint Presentation' }
  ];

  const handleInputChange = (field, value) => {
    setUploadData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setUploadData(prev => ({
        ...prev,
        file: file,
        fileType: file?.type?.includes('pdf') ? 'pdf' : 
                  file?.type?.includes('word') || file?.type?.includes('document') ? 'doc' : 'ppt'
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsUploading(true);

    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      if (onUpload) {
        onUpload({
          ...uploadData,
          id: Date.now(),
          uploadDate: new Date()?.toISOString(),
          fileSize: uploadData?.file?.size || 0
        });
      }

      // Reset form
      setUploadData({
        title: '',
        subject: '',
        semester: '',
        fileType: '',
        description: '',
        file: null
      });
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const isFormValid = uploadData?.title && uploadData?.subject && uploadData?.semester && uploadData?.file;

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Button
        variant="default"
        onClick={() => setIsModalOpen(true)}
        iconName="Upload"
        iconPosition="left"
        className="mb-4"
      >
        Upload Notes
      </Button>
      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Upload Notes</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsModalOpen(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Title"
                  type="text"
                  placeholder="Enter note title"
                  value={uploadData?.title}
                  onChange={(e) => handleInputChange('title', e?.target?.value)}
                  required
                />

                <Select
                  label="Subject"
                  options={subjectOptions}
                  value={uploadData?.subject}
                  onChange={(value) => handleInputChange('subject', value)}
                  placeholder="Select subject"
                  required
                />

                <Select
                  label="Semester"
                  options={semesterOptions}
                  value={uploadData?.semester}
                  onChange={(value) => handleInputChange('semester', value)}
                  placeholder="Select semester"
                  required
                />

                <Input
                  label="Description"
                  type="text"
                  placeholder="Brief description (optional)"
                  value={uploadData?.description}
                  onChange={(e) => handleInputChange('description', e?.target?.value)}
                />

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Upload File
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Icon name="Upload" size={24} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {uploadData?.file ? uploadData?.file?.name : 'Click to upload file'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PDF, DOC, PPT files only
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    loading={isUploading}
                    disabled={!isFormValid}
                    className="flex-1"
                  >
                    {isUploading ? 'Uploading...' : 'Upload'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadButton;