import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Home',
      path: '/',
      icon: 'Home',
      tooltip: 'Dashboard overview and quick access'
    },
    {
      label: 'Roadmaps',
      path: '/roadmaps-catalog',
      icon: 'Map',
      tooltip: 'Structured learning paths'
    },
    {
      label: 'Notes',
      path: '/notes-repository',
      icon: 'BookOpen',
      tooltip: 'Academic resource repository'
    },
    {
      label: 'Exams',
      path: '/exams-internships-hub',
      icon: 'GraduationCap',
      tooltip: 'Career preparation hub'
    },
    {
      label: 'Contact',
      path: '/contact-suggestions',
      icon: 'MessageCircle',
      tooltip: 'Platform engagement and feedback'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      // Handle search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 150);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsSearchExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-elevation-1">
        <div className="flex h-16 items-center px-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-150"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Code" size={20} color="white" />
              </div>
              <span className="hidden sm:block text-xl font-semibold text-foreground">
                CSE Roadmap Hub
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 ml-8">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 overflow-hidden ${
                  location?.pathname === item?.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center ml-auto">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search roadmaps, notes, exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-64 pl-10"
              />
              <Icon
                name="Search"
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
            </form>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center ml-auto md:hidden space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className="relative"
            >
              <Icon name="Search" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="relative"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isSearchExpanded && (
          <div className="md:hidden border-t border-border bg-card p-4 animate-slide-in-from-top">
            <form onSubmit={handleSearch} className="relative">
              <Input
                id="search-input"
                type="search"
                placeholder="Search roadmaps, notes, exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10"
              />
              <Icon
                name="Search"
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
            </form>
          </div>
        )}
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={toggleMobileMenu} />
          <div className="fixed top-16 left-0 right-0 bg-card border-b border-border shadow-elevation-2 animate-slide-in-from-top">
            <nav className="px-4 py-6 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-left transition-colors duration-150 ${
                    location?.pathname === item?.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <div>
                    <div className="font-medium">{item?.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item?.tooltip}
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;