import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: 'Mail',
      label: 'Email Support',
      value: 'support@cseroadmaphub.com',
      description: 'General inquiries and support',
      action: 'mailto:support@cseroadmaphub.com'
    },
    {
      icon: 'MessageSquare',
      label: 'Live Chat',
      value: 'Available 9 AM - 6 PM IST',
      description: 'Instant help for urgent queries',
      action: '#'
    },
    {
      icon: 'Phone',
      label: 'Phone Support',
      value: '+91 98765 43210',
      description: 'Mon-Fri, 10 AM - 5 PM IST',
      action: 'tel:+919876543210'
    },
    {
      icon: 'MapPin',
      label: 'Office Location',
      value: 'Bangalore, Karnataka',
      description: 'India - Tech Hub',
      action: '#'
    }
  ];

  const handleContactClick = (action, label) => {
    if (action?.startsWith('mailto:') || action?.startsWith('tel:')) {
      window.location.href = action;
    } else {
      console.log(`Clicked on ${label}`);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Other Ways to Reach Us
        </h2>
        <p className="text-muted-foreground">
          Choose the most convenient way to get in touch with our team.
        </p>
      </div>
      <div className="space-y-4">
        {contactDetails?.map((contact, index) => (
          <button
            key={index}
            onClick={() => handleContactClick(contact?.action, contact?.label)}
            className="w-full p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/30 transition-all duration-200 text-left group"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                <Icon 
                  name={contact?.icon} 
                  size={18} 
                  className="text-primary group-hover:scale-110 transition-transform duration-200" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground">
                    {contact?.label}
                  </h4>
                  <Icon 
                    name="ExternalLink" 
                    size={14} 
                    className="text-muted-foreground group-hover:text-primary transition-colors duration-200" 
                  />
                </div>
                <p className="text-sm text-primary font-medium mt-1">
                  {contact?.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {contact?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Clock" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">
                Response Times
              </h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Email Support:</span>
                  <span className="font-medium">24-48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Live Chat:</span>
                  <span className="font-medium">Instant</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone Support:</span>
                  <span className="font-medium">Immediate</span>
                </div>
                <div className="flex justify-between">
                  <span>Resource Suggestions:</span>
                  <span className="font-medium">3-5 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;