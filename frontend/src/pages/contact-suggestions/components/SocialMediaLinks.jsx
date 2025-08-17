import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialMediaLinks = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      url: 'https://linkedin.com/company/cse-roadmap-hub',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      description: 'Connect with us professionally'
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      url: 'https://twitter.com/cse_roadmap_hub',
      color: 'text-sky-500',
      bgColor: 'bg-sky-50 hover:bg-sky-100',
      description: 'Follow for quick updates'
    },
    {
      name: 'GitHub',
      icon: 'Github',
      url: 'https://github.com/cse-roadmap-hub',
      color: 'text-gray-800',
      bgColor: 'bg-gray-50 hover:bg-gray-100',
      description: 'Contribute to our projects'
    },
    {
      name: 'Discord',
      icon: 'MessageSquare',
      url: 'https://discord.gg/cse-roadmap-hub',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 hover:bg-indigo-100',
      description: 'Join our community'
    },
    {
      name: 'YouTube',
      icon: 'Play',
      url: 'https://youtube.com/@cse-roadmap-hub',
      color: 'text-red-600',
      bgColor: 'bg-red-50 hover:bg-red-100',
      description: 'Watch tutorials & guides'
    },
    {
      name: 'Telegram',
      icon: 'Send',
      url: 'https://t.me/cse_roadmap_hub',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      description: 'Get instant notifications'
    }
  ];

  const handleSocialClick = (url, name) => {
    // In a real app, this would open the social media link
    console.log(`Opening ${name}: ${url}`);
    // window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center space-x-2">
          <Icon name="Share2" size={24} className="text-primary" />
          <span>Connect With Us</span>
        </h2>
        <p className="text-muted-foreground">
          Follow us on social media for the latest updates, tips, and community discussions.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {socialLinks?.map((social) => (
          <button
            key={social?.name}
            onClick={() => handleSocialClick(social?.url, social?.name)}
            className={`p-4 rounded-lg border border-border transition-all duration-200 hover:shadow-elevation-1 hover:scale-105 ${social?.bgColor} group`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow duration-200`}>
                <Icon 
                  name={social?.icon} 
                  size={20} 
                  className={`${social?.color} group-hover:scale-110 transition-transform duration-200`} 
                />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground text-sm">
                  {social?.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {social?.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Users" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">
                Join Our Growing Community
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Connect with thousands of CSE students, share experiences, and get help from peers and mentors.
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} />
                  <span>5,000+ Students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MessageCircle" size={12} />
                  <span>Active Discussions</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="BookOpen" size={12} />
                  <span>Daily Resources</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Button
          variant="outline"
          fullWidth
          iconName="ExternalLink"
          iconPosition="right"
          onClick={() => handleSocialClick('https://cse-roadmap-hub.com/community', 'Community Hub')}
        >
          Visit Community Hub
        </Button>
      </div>
    </div>
  );
};

export default SocialMediaLinks;