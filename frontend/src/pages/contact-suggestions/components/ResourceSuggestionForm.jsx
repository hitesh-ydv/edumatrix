import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ResourceSuggestionForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    category: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categoryOptions = [
    { value: 'roadmap', label: 'Learning Roadmap' },
    { value: 'course', label: 'Online Course' },
    { value: 'notes', label: 'Study Notes' },
    { value: 'book', label: 'Reference Book' },
    { value: 'tutorial', label: 'Tutorial/Guide' },
    { value: 'tool', label: 'Development Tool' },
    { value: 'practice', label: 'Practice Platform' },
    { value: 'exam', label: 'Exam Preparation' },
    { value: 'internship', label: 'Internship Opportunity' },
    { value: 'other', label: 'Other Resource' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Resource title is required';
    } else if (formData?.title?.trim()?.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData?.link?.trim()) {
      newErrors.link = 'Resource link is required';
    } else if (!/^https?:\/\/.+\..+/?.test(formData?.link)) {
      newErrors.link = 'Please enter a valid URL (starting with http:// or https://)';
    }

    if (!formData?.category) {
      newErrors.category = 'Please select a category';
    }

    if (formData?.description?.trim() && formData?.description?.trim()?.length < 10) {
      newErrors.description = 'Description must be at least 10 characters if provided';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCategoryChange = (value) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));

    if (errors?.category) {
      setErrors(prev => ({
        ...prev,
        category: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      setFormData({ title: '', link: '', category: '', description: '' });
      setErrors({});
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      setErrors({ submit: 'Failed to submit suggestion. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Heart" size={32} className="text-success" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Thank You for Your Suggestion!
          </h3>
          <p className="text-muted-foreground mb-4">
            Your resource suggestion has been submitted for review. We appreciate your contribution to helping fellow students.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setIsSubmitted(false)}
            className="mt-2"
          >
            Suggest Another Resource
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Suggest a Resource
        </h2>
        <p className="text-muted-foreground">
          Help your fellow students by sharing valuable learning resources you've discovered.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Resource Title"
          type="text"
          name="title"
          placeholder="e.g., Complete React.js Tutorial Series"
          value={formData?.title}
          onChange={handleInputChange}
          error={errors?.title}
          required
          disabled={isSubmitting}
        />

        <Input
          label="Resource Link"
          type="url"
          name="link"
          placeholder="https://example.com/resource"
          value={formData?.link}
          onChange={handleInputChange}
          error={errors?.link}
          description="Please provide the complete URL to the resource"
          required
          disabled={isSubmitting}
        />

        <Select
          label="Category"
          placeholder="Select resource category"
          options={categoryOptions}
          value={formData?.category}
          onChange={handleCategoryChange}
          error={errors?.category}
          required
          disabled={isSubmitting}
          searchable
        />

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-foreground">
            Description <span className="text-muted-foreground">(Optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Brief description of why this resource is helpful..."
            value={formData?.description}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none transition-colors duration-150 ${
              errors?.description 
                ? 'border-error focus:ring-error/20' :'border-border focus:ring-primary/20'
            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          {errors?.description && (
            <p className="text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors?.description}</span>
            </p>
          )}
        </div>

        {errors?.submit && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-md">
            <p className="text-sm text-error flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} />
              <span>{errors?.submit}</span>
            </p>
          </div>
        )}

        <Button
          type="submit"
          variant="default"
          loading={isSubmitting}
          disabled={isSubmitting}
          iconName="Plus"
          iconPosition="left"
          fullWidth
          className="mt-6"
        >
          {isSubmitting ? 'Submitting Suggestion...' : 'Submit Suggestion'}
        </Button>
      </form>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-warning mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">
                Suggestion Guidelines
              </h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Ensure the resource is freely accessible or clearly mention if paid</li>
                <li>• Verify the link works and content is relevant to CSE students</li>
                <li>• Avoid duplicate suggestions - check existing resources first</li>
                <li>• All suggestions are reviewed before being added to the platform</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceSuggestionForm;