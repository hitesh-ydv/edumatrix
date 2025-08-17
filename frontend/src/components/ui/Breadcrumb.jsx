import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/': { label: 'Home', icon: 'Home' },
    '/roadmaps-catalog': { label: 'Roadmaps', icon: 'Map' },
    '/roadmap-detail-view': { label: 'Roadmap Details', icon: 'MapPin' },
    '/notes-repository': { label: 'Notes', icon: 'BookOpen' },
    '/exams-internships-hub': { label: 'Exams & Internships', icon: 'GraduationCap' },
    '/contact-suggestions': { label: 'Contact & Suggestions', icon: 'MessageCircle' }
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [];

    // Always start with Home
    breadcrumbs?.push({
      label: 'Home',
      path: '/',
      icon: 'Home'
    });

    // Build breadcrumbs based on current path
    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap?.[currentPath];
      
      if (routeInfo && currentPath !== '/') {
        breadcrumbs?.push({
          label: routeInfo?.label,
          path: currentPath,
          icon: routeInfo?.icon,
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't render breadcrumbs on home page unless there are custom items
  if (location?.pathname === '/' && !customItems) {
    return null;
  }

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs?.map((item, index) => (
          <li key={item?.path || index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="mx-2 text-muted-foreground/60" 
              />
            )}
            
            {item?.isLast || !item?.path ? (
              <span className="flex items-center space-x-1 text-foreground font-medium">
                {item?.icon && <Icon name={item?.icon} size={14} />}
                <span>{item?.label}</span>
              </span>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                className="flex items-center space-x-1 h-auto p-1 text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                {item?.icon && <Icon name={item?.icon} size={14} />}
                <span>{item?.label}</span>
              </Button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;