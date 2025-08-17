import React from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ContactForm from './components/ContactForm';
import ResourceSuggestionForm from './components/ResourceSuggestionForm';
import NewsletterSubscription from './components/NewsletterSubscription';
import SocialMediaLinks from './components/SocialMediaLinks';
import ContactInfo from './components/ContactInfo';
import Icon from '../../components/AppIcon';

const ContactSuggestions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb />
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="MessageCircle" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Contact & Suggestions
              </h1>
              <p className="text-muted-foreground mt-1">
                Get in touch with us or help improve our platform by suggesting valuable resources
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Contact Form */}
          <div className="space-y-8">
            <ContactForm />
            <ContactInfo />
          </div>

          {/* Right Column - Suggestions & Newsletter */}
          <div className="space-y-8">
            <ResourceSuggestionForm />
            <NewsletterSubscription />
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mb-8">
          <SocialMediaLinks />
        </div>

        {/* FAQ Section */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center space-x-2">
              <Icon name="HelpCircle" size={24} className="text-primary" />
              <span>Frequently Asked Questions</span>
            </h2>
            <p className="text-muted-foreground">
              Quick answers to common questions about our platform and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">
                  How do I suggest a new roadmap?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Use the "Suggest a Resource" form above and select "Learning Roadmap" as the category. Provide detailed information about the roadmap topic and structure.
                </p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">
                  Can I contribute study notes?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yes! Submit your notes through our suggestion form. All contributions are reviewed for quality and relevance before being added to the platform.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">
                  How often is content updated?
                </h4>
                <p className="text-sm text-muted-foreground">
                  We update our content weekly with new resources, roadmaps, and study materials. Subscribe to our newsletter to stay informed about updates.
                </p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">
                  Is the platform free to use?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yes, CSE Roadmap Hub is completely free for all students. We believe in making quality education accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20 p-6">
          <div className="text-center">
            <Icon name="Users" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Join Our Community of Learners
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Connect with thousands of CSE students, share your knowledge, and accelerate your learning journey. 
              Together, we're building the most comprehensive resource hub for computer science education.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Users" size={16} className="text-primary" />
                <span>5,000+ Active Students</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="BookOpen" size={16} className="text-primary" />
                <span>500+ Resources</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="TrendingUp" size={16} className="text-primary" />
                <span>Growing Daily</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Code" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                CSE Roadmap Hub
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your one-stop guide for B.Tech CSE success
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} CSE Roadmap Hub. All rights reserved. Made with ❤️ for students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactSuggestions;