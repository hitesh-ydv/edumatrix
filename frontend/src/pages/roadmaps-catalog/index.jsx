import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterTabs from './components/FilterTabs';
import SearchAndFilter from './components/SearchAndFilter';
import SortOptions from './components/SortOptions';
import RoadmapGrid from './components/RoadmapGrid';
import axios from 'axios';

const RoadmapsCatalog = () => {
  const [activeFilter, setActiveFilter] = useState('semester');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    duration: 'all',
    rating: [],
    enrollment: [],
    features: []
  });

  // Mock roadmaps data
  const mockRoadmaps = [
    {
      id: 1,
      title: "Data Structures & Algorithms Mastery",
      description: `Complete roadmap covering fundamental data structures like arrays, linked lists, stacks, queues, trees, and graphs.\nIncludes algorithmic problem-solving techniques and complexity analysis for competitive programming success.`,
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      difficulty: "Intermediate",
      duration: "12 weeks",
      enrolled: "2,847",
      rating: 4.8,
      progress: 65,
      tags: ["DSA", "Algorithms", "Problem Solving", "Competitive Programming"],
      category: "skill",
      semester: "sem3"
    },
    {
      id: 2,
      title: "Full Stack Web Development",
      description: `End-to-end web development journey covering HTML, CSS, JavaScript, React, Node.js, and database integration.\nBuild real-world projects and deploy applications to production environments.`,
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
      difficulty: "Beginner",
      duration: "16 weeks",
      enrolled: "4,521",
      rating: 4.9,
      progress: 23,
      tags: ["React", "Node.js", "JavaScript", "Web Development"],
      category: "skill",
      semester: "sem4"
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      description: `Introduction to machine learning concepts, supervised and unsupervised learning algorithms.\nHands-on experience with Python, scikit-learn, and real-world datasets for practical ML applications.`,
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
      difficulty: "Advanced",
      duration: "20 weeks",
      enrolled: "1,923",
      rating: 4.7,
      tags: ["Python", "ML", "Data Science", "AI"],
      category: "skill",
      semester: "sem6"
    },
    {
      id: 4,
      title: "Semester 1 - Programming Fundamentals",
      description: `Complete first semester curriculum covering C programming, basic mathematics, and engineering fundamentals.\nStructured learning path aligned with university syllabus and examination patterns.`,
      thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop",
      difficulty: "Beginner",
      duration: "18 weeks",
      enrolled: "6,234",
      rating: 4.6,
      progress: 89,
      tags: ["C Programming", "Mathematics", "Engineering", "Fundamentals"],
      category: "semester",
      semester: "sem1"
    },
    {
      id: 5,
      title: "Semester 3 - Core Computer Science",
      description: `Third semester roadmap including Data Structures, Object-Oriented Programming, and Computer Organization.\nComprehensive coverage of core CS concepts with practical implementations and projects.`,
      thumbnail: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=300&fit=crop",
      difficulty: "Intermediate",
      duration: "18 weeks",
      enrolled: "3,456",
      rating: 4.5,
      progress: 42,
      tags: ["Data Structures", "OOP", "Computer Organization", "Core CS"],
      category: "semester",
      semester: "sem3"
    },
    {
      id: 6,
      title: "Mobile App Development with React Native",
      description: `Build cross-platform mobile applications using React Native framework.\nLearn navigation, state management, API integration, and app store deployment processes.`,
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      difficulty: "Intermediate",
      duration: "14 weeks",
      enrolled: "2,187",
      rating: 4.4,
      tags: ["React Native", "Mobile Development", "Cross-platform", "JavaScript"],
      category: "skill",
      semester: "sem5"
    },
    {
      id: 7,
      title: "Cybersecurity Essentials",
      description: `Comprehensive cybersecurity roadmap covering network security, cryptography, and ethical hacking.\nPractical labs and real-world scenarios to build security expertise and industry readiness.`,
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
      difficulty: "Advanced",
      duration: "22 weeks",
      enrolled: "1,654",
      rating: 4.8,
      tags: ["Security", "Networking", "Cryptography", "Ethical Hacking"],
      category: "skill",
      semester: "sem7"
    },
    {
      id: 8,
      title: "Semester 5 - Advanced Topics",
      description: `Fifth semester curriculum including Database Management Systems, Software Engineering, and Computer Networks.\nAdvanced concepts with industry-relevant projects and case studies for practical understanding.`,
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      difficulty: "Intermediate",
      duration: "18 weeks",
      enrolled: "2,891",
      rating: 4.7,
      progress: 15,
      tags: ["DBMS", "Software Engineering", "Networks", "Advanced CS"],
      category: "semester",
      semester: "sem5"
    },
    {
      id: 9,
      title: "DevOps and Cloud Computing",
      description: `Modern DevOps practices including CI/CD, containerization with Docker, Kubernetes orchestration.\nCloud platforms (AWS, Azure) deployment and infrastructure as code implementation.`,
      thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop",
      difficulty: "Advanced",
      duration: "18 weeks",
      enrolled: "1,432",
      rating: 4.6,
      tags: ["DevOps", "Docker", "Kubernetes", "Cloud", "AWS"],
      category: "skill",
      semester: "sem6"
    }
  ];

  const [filteredRoadmaps, setFilteredRoadmaps] = useState([]);
  const [allRoadmaps, setAllRoadmaps] = useState([]);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/roadmaps');
        setAllRoadmaps(response.data);
        console.log(response.data)
      } catch (err) {
        console.error('Error fetching roadmaps:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  useEffect(() => {
    let filtered = allRoadmaps?.filter(roadmap => {
      // Filter by active tab (semester vs skill)
      if (activeFilter === 'semester' && roadmap?.category !== 'semester') return false;
      if (activeFilter === 'skill' && roadmap?.category !== 'skill') return false;
      
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery?.toLowerCase();
        if (!roadmap?.title?.toLowerCase()?.includes(searchLower) &&
            !roadmap?.description?.toLowerCase()?.includes(searchLower) &&
            !roadmap?.tags?.some(tag => tag?.toLowerCase()?.includes(searchLower))) {
          return false;
        }
      }
      
      // Category filter
      if (filters?.category !== 'all') {
        if (activeFilter === 'semester' && roadmap?.semester !== filters?.category) return false;
        if (activeFilter === 'skill' && !roadmap?.tags?.some(tag => 
          tag?.toLowerCase()?.includes(filters?.category?.replace('-', ' ')))) return false;
      }
      
      // Difficulty filter
      if (filters?.difficulty !== 'all' && 
          roadmap?.difficulty?.toLowerCase() !== filters?.difficulty) return false;
      
      // Duration filter
      if (filters?.duration !== 'all') {
        const weeks = parseInt(roadmap?.duration);
        if (filters?.duration === 'short' && weeks >= 4) return false;
        if (filters?.duration === 'medium' && (weeks < 4 || weeks > 12)) return false;
        if (filters?.duration === 'long' && weeks <= 12) return false;
      }
      
      // Rating filter
      if (filters?.rating?.length > 0) {
        if (!filters?.rating?.some(rating => roadmap?.rating >= rating)) return false;
      }
      
      return true;
    });

    // Sort filtered results
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return parseInt(b?.enrolled?.replace(',', '')) - parseInt(a?.enrolled?.replace(',', ''));
        case 'duration':
          return parseInt(a?.duration) - parseInt(b?.duration);
        case 'difficulty':
          const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
          return difficultyOrder?.[a?.difficulty] - difficultyOrder?.[b?.difficulty];
        case 'recent':
          return b?.id - a?.id; // Assuming higher ID means more recent
        case 'alphabetical':
          return a?.title?.localeCompare(b?.title);
        default:
          return 0;
      }
    });

    setFilteredRoadmaps(filtered);
  }, [allRoadmaps, activeFilter, searchQuery, filters, sortBy]);

  const handleFilterChange = (newFilter) => {
    setActiveFilter(newFilter);
    // Reset category filter when switching tabs
    setFilters(prev => ({ ...prev, category: 'all' }));
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      difficulty: 'all',
      duration: 'all',
      rating: [],
      enrollment: [],
      features: []
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Breadcrumb />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Roadmaps Catalog
          </h1>
          <p className="text-muted-foreground">
            Discover structured learning paths for your academic and professional journey
          </p>
        </div>

        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          resultCount={filteredRoadmaps?.length}
        />

        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
          activeFilter={activeFilter}
        />

        <SortOptions
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <RoadmapGrid
          roadmaps={filteredRoadmaps}
          viewMode={viewMode}
          loading={loading}
        />

        {!loading && filteredRoadmaps?.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredRoadmaps?.length} of {allRoadmaps?.length} roadmaps
            </p>
            <div className="text-xs text-muted-foreground">
              Last updated: {new Date()?.toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric' 
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RoadmapsCatalog;