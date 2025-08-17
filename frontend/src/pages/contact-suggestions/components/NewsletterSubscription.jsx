import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(email);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!email?.trim()) {
      setError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    setError('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    } catch (error) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e?.target?.value);
    if (error) {
      setError('');
    }
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/20 p-6 shadow-elevation-1">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Mail" size={32} className="text-success" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Successfully Subscribed!
          </h3>
          <p className="text-muted-foreground mb-4">
            Welcome to our newsletter! You'll receive updates about new resources, roadmaps, and platform features.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>Check your email for confirmation</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/20 p-6 shadow-elevation-1">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center space-x-2">
          <Icon name="Bell" size={24} className="text-primary" />
          <span>Stay Updated</span>
        </h2>
        <p className="text-muted-foreground">
          Get notified about new roadmaps, study resources, and platform updates.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleEmailChange}
          error={error}
          required
          disabled={isSubscribing}
        />

        <Button
          type="submit"
          variant="default"
          loading={isSubscribing}
          disabled={isSubscribing}
          iconName="Mail"
          iconPosition="right"
          fullWidth
        >
          {isSubscribing ? 'Subscribing...' : 'Subscribe to Newsletter'}
        </Button>
      </form>

      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span>Weekly updates</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="BookOpen" size={16} className="text-primary" />
            <span>New resources</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span>Career tips</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Users" size={16} className="text-primary" />
            <span>Community highlights</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          No spam, unsubscribe anytime. We respect your privacy and will never share your email.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSubscription;