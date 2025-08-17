import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchBar from '../../components/ui/SearchBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import SemesterSelector from './components/SemesterSelector';
import NotesCard from './components/NotesCard';
import SyllabusCard from './components/SyllabusCard';
import FilterSidebar from './components/FilterSidebar';
import UploadButton from './components/UploadButton';
import axios from 'axios';

const NotesRepository = () => {
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('notes');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    fileTypes: [],
    subjects: [],
    semesters: []
  });
  const [isAdmin] = useState(true); // Mock admin status

  // Mock notes data
  const mockNotes = [
    {
      id: 1,
      title: "Data Structures and Algorithms Complete Notes",
      subject: "Data Structures",
      semester: "3",
      fileType: "PDF",
      fileSize: 2048576,
      uploadDate: "2024-08-10T10:30:00Z",
      description: "Comprehensive notes covering arrays, linked lists, stacks, queues, trees, and graphs with examples and practice problems.",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Operating Systems Concepts",
      subject: "Operating Systems",
      semester: "4",
      fileType: "PDF",
      fileSize: 1536000,
      uploadDate: "2024-08-08T14:15:00Z",
      description: "Process management, memory management, file systems, and synchronization concepts explained with diagrams."
    },
    {
      id: 3,
      title: "Database Management System Notes",
      subject: "Database Management",
      semester: "4",
      fileType: "DOC",
      fileSize: 1024000,
      uploadDate: "2024-08-05T09:20:00Z",
      description: "DBMS fundamentals, SQL queries, normalization, transactions, and database design principles.",
      thumbnail: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Computer Networks Presentation",
      subject: "Computer Networks",
      semester: "5",
      fileType: "PPT",
      fileSize: 3072000,
      uploadDate: "2024-08-03T16:45:00Z",
      description: "Network protocols, OSI model, TCP/IP, routing algorithms, and network security fundamentals."
    },
    {
      id: 5,
      title: "Software Engineering Methodologies",
      subject: "Software Engineering",
      semester: "6",
      fileType: "PDF",
      fileSize: 1792000,
      uploadDate: "2024-08-01T11:30:00Z",
      description: "SDLC models, Agile methodology, testing strategies, and project management techniques.",
      thumbnail: "https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_960_720.jpg"
    },
    {
      id: 6,
      title: "Machine Learning Algorithms",
      subject: "Machine Learning",
      semester: "7",
      fileType: "PDF",
      fileSize: 2560000,
      uploadDate: "2024-07-28T13:20:00Z",
      description: "Supervised and unsupervised learning algorithms, neural networks, and deep learning concepts."
    }
  ];

  // Mock syllabus data
  const mockSyllabus = [
    {
      id: 1,
      title: "B.Tech CSE Curriculum - First Year",
      description: "Complete syllabus for 1st and 2nd semester including Mathematics, Physics, Chemistry, and Programming fundamentals",
      semester: "1-2",
      academicYear: "2024-25",
      fileSize: 512000,
      lastUpdated: "2024-08-01T10:00:00Z",
      isOfficial: true
    },
    {
      id: 2,
      title: "Core Computer Science Subjects",
      description: "Syllabus for 3rd and 4th semester covering Data Structures, Algorithms, Operating Systems, and DBMS",
      semester: "3-4",
      academicYear: "2024-25",
      fileSize: 768000,
      lastUpdated: "2024-07-25T14:30:00Z",
      isOfficial: true
    },
    {
      id: 3,
      title: "Advanced Topics and Specializations",
      description: "5th and 6th semester syllabus including Computer Networks, Software Engineering, and elective subjects",
      semester: "5-6",
      academicYear: "2024-25",
      fileSize: 640000,
      lastUpdated: "2024-07-20T09:15:00Z",
      isOfficial: true
    },
    {
      id: 4,
      title: "Final Year Project and Internship",
      description: "7th and 8th semester guidelines for major project, internship, and placement preparation",
      semester: "7-8",
      academicYear: "2024-25",
      fileSize: 384000,
      lastUpdated: "2024-07-15T16:45:00Z",
      isOfficial: true
    }
  ];

  const [filteredNotes, setFilteredNotes] = useState([]);
  const [syllabusData, setSyllabusData] = useState([]);
  const [filteredSyllabus, setFilteredSyllabus] = useState([]);

    useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        //setLoading(true);
        const response = await axios.get('http://localhost:5000/api/notes');
        setFilteredNotes(response.data)
        console.log(response.data)
      } catch (err) {
        console.error('Error fetching roadmaps:', err);
      } finally {
        //setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  // Fetch syllabus from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/syllabus") // Change to VPS URL when live
      .then(res => res.json())
      .then(data => {
        // Map to match your mockSyllabus structure
        const formatted = data.map((item, index) => ({
          id: item.id || item._id || index + 1,
          title: item.title,
          description: item.description,
          semester: item.semester,
          academicYear: item.academicYear,
          fileSize: item.fileSize,
          lastUpdated: item.lastUpdated,
          isOfficial: item.isOfficial
        }));
        setSyllabusData(formatted);
        setFilteredSyllabus(formatted);
      })
      .catch(err => console.error("Error fetching syllabus:", err));
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = filteredNotes;

    // Apply semester filter
    if (selectedSemester !== 'all') {
      filtered = filtered?.filter(note => note?.semester === selectedSemester);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(note =>
        note?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        note?.subject?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        note?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply advanced filters
    if (filters?.fileTypes?.length > 0) {
      filtered = filtered?.filter(note =>
        filters?.fileTypes?.includes(note?.fileType?.toLowerCase())
      );
    }

    if (filters?.subjects?.length > 0) {
      filtered = filtered?.filter(note =>
        filters?.subjects?.some(subject =>
          note?.subject?.toLowerCase()?.includes(subject?.replace('-', ' '))
        )
      );
    }

    if (filters?.semesters?.length > 0) {
      filtered = filtered?.filter(note =>
        filters?.semesters?.includes(note?.semester)
      );
    }

    setFilteredNotes(filtered);
  }, [selectedSemester, searchQuery, filters]);

  // Filter syllabus based on search
  useEffect(() => {
    let filtered = syllabusData;

    if (searchQuery) {
      filtered = filtered.filter(s =>
        s.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSyllabus(filtered);
  }, [searchQuery, syllabusData]);

  const handleSearch = (query, results) => {
    setSearchQuery(query);
  };

  const handleDownload = async (item) => {
    // Mock download functionality
    console.log('Downloading:', item?.title);
    // In real implementation, this would trigger actual file download
  };

  const handleFilterChange = (category, values) => {
    setFilters(prev => ({
      ...prev,
      [category]: values
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      fileTypes: [],
      subjects: [],
      semesters: []
    });
  };

  const handleUpload = (uploadData) => {
    console.log('New upload:', uploadData);
    // In real implementation, this would add the new note to the list
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Breadcrumb />

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Notes Repository
              </h1>
              <p className="text-muted-foreground">
                Access comprehensive study materials and official syllabi for all semesters
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <UploadButton isAdmin={isAdmin} onUpload={handleUpload} />
            </div>
          </div>

          {/* Search and Semester Selector */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchBar
                placeholder="Search notes, subjects, or topics..."
                onSearch={handleSearch}
                showFilters={false}
                className="w-full"
              />
            </div>
            <SemesterSelector
              selectedSemester={selectedSemester}
              onSemesterChange={setSelectedSemester}
            />
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center space-x-1 mb-6">
            <Button
              variant={activeTab === 'notes' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('notes')}
              iconName="BookOpen"
              iconPosition="left"
              iconSize={16}
            >
              Student Notes ({filteredNotes?.length})
            </Button>
            <Button
              variant={activeTab === 'syllabus' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('syllabus')}
              iconName="FileText"
              iconPosition="left"
              iconSize={16}
            >
              Official Syllabus ({filteredSyllabus?.length})
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          {activeTab === 'notes' && (
            <>
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />

              {/* Mobile Filter Button */}
              <div className="lg:hidden fixed bottom-6 right-6 z-30">
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => setIsFilterOpen(true)}
                  className="rounded-full shadow-elevation-2"
                >
                  <Icon name="Filter" size={20} />
                </Button>
              </div>
            </>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'notes' ? (
              <>
                {/* Results Summary */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredNotes?.length} of {filteredNotes?.length} notes
                    {selectedSemester !== 'all' && ` for Semester ${selectedSemester}`}
                  </p>

                  {/* Sort Options */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Latest <Icon name="ChevronDown" size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>

                {/* Notes Grid */}
                {filteredNotes?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredNotes?.map((note) => (
                      <NotesCard
                        key={note?.id}
                        note={note}
                        onDownload={handleDownload}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No notes found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search terms or filters
                    </p>
                    <Button variant="outline" onClick={handleClearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Syllabus Section */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    Official curriculum and syllabus documents
                  </p>
                </div>

                {filteredSyllabus?.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredSyllabus?.map((syllabus) => (
                      <SyllabusCard
                        key={syllabus?.id}
                        syllabus={syllabus}
                        onDownload={handleDownload}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="FileText" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No syllabus found</h3>
                    <p className="text-muted-foreground">
                      No syllabus documents match your search
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotesRepository;