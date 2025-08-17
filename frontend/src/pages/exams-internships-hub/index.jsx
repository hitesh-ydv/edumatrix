import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ExamCard from './components/ExamCard';
import InternshipCard from './components/InternshipCard';
import DeadlinesSidebar from './components/DeadlinesSidebar';
import FilterBar from './components/FilterBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import axios from 'axios';

const ExamsInternshipsHub = () => {
  const [activeTab, setActiveTab] = useState('exams');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    all: 'all',
    difficulty: 'all',
    location: 'all',
    duration: 'all',
    stipend: 'all'
  });
  const [filteredData, setFilteredData] = useState([]);

  // Mock data for competitive exams
  const mockExams = [
    {
      id: 1,
      name: "GATE CSE",
      type: "Competitive",
      difficulty: "Hard",
      description: `Graduate Aptitude Test in Engineering for Computer Science & Engineering. A national level examination conducted jointly by IISc and seven IITs for admission to postgraduate programs.\n\nCovers topics like Programming, Data Structures, Algorithms, Computer Organization, Operating Systems, Databases, Computer Networks, and Theory of Computation.`,
      duration: "3 hours",
      fee: "₹1,850",
      nextExamDate: "February 2025",
      isPopular: true,
      preparationTips: [
        "Focus on fundamental concepts and problem-solving",
        "Practice previous year questions extensively",
        "Create a structured study plan covering all subjects",
        "Take regular mock tests to improve time management"
      ],
      syllabusUrl: "/assets/syllabus/gate-cse-syllabus.pdf"
    },
    {
      id: 2,
      name: "JEE Advanced",
      type: "Competitive",
      difficulty: "Hard",
      description: `Joint Entrance Examination Advanced for admission to Indian Institutes of Technology (IITs). One of the most challenging engineering entrance exams in India.\n\nRequires strong foundation in Physics, Chemistry, and Mathematics with emphasis on analytical and problem-solving skills.`,
      duration: "6 hours (2 papers)",
      fee: "₹2,800",
      nextExamDate: "May 2025",
      isPopular: true,
      preparationTips: [
        "Master NCERT concepts thoroughly",
        "Solve challenging problems regularly",
        "Focus on speed and accuracy",
        "Analyze mistakes in mock tests"
      ],
      syllabusUrl: "/assets/syllabus/jee-advanced-syllabus.pdf"
    },
    {
      id: 3,
      name: "UPSC CSE",
      type: "Competitive",
      difficulty: "Hard",
      description: `Union Public Service Commission Civil Services Examination for recruitment to various Group A and Group B services of the Government of India.\n\nComprehensive examination covering General Studies, Optional Subject, Essay Writing, and Personality Test.`,
      duration: "Multiple stages",
      fee: "₹200",
      nextExamDate: "June 2025",
      isPopular: false,
      preparationTips: [
        "Read newspapers daily for current affairs",
        "Choose optional subject wisely",
        "Practice answer writing regularly",
        "Develop analytical thinking skills"
      ],
      syllabusUrl: "/assets/syllabus/upsc-cse-syllabus.pdf"
    },
    {
      id: 4,
      name: "CAT",
      type: "Competitive",
      difficulty: "Medium",
      description: `Common Admission Test for admission to postgraduate management programs in Indian Institutes of Management (IIMs) and other top business schools.\n\nTests skills in Quantitative Ability, Verbal Ability & Reading Comprehension, and Data Interpretation & Logical Reasoning.`,
      duration: "2 hours",
      fee: "₹2,300",
      nextExamDate: "November 2024",
      isPopular: true,
      preparationTips: [
        "Build strong fundamentals in all three sections",
        "Practice time management extensively",
        "Read regularly to improve vocabulary",
        "Take sectional and full-length mocks"
      ],
      syllabusUrl: "/assets/syllabus/cat-syllabus.pdf"
    },
    {
      id: 5,
      name: "NEET",
      type: "Competitive",
      difficulty: "Medium",
      description: `National Eligibility cum Entrance Test for admission to undergraduate medical courses (MBBS/BDS) in government and private medical colleges.\n\nCovers Physics, Chemistry, and Biology (Botany & Zoology) based on NCERT curriculum.`,
      duration: "3 hours 20 minutes",
      fee: "₹1,700",
      nextExamDate: "May 2025",
      isPopular: true,
      preparationTips: [
        "Focus on NCERT textbooks thoroughly",
        "Practice diagrams and biological processes",
        "Solve previous year questions",
        "Take regular biology practice tests"
      ],
      syllabusUrl: "/assets/syllabus/neet-syllabus.pdf"
    },
    {
      id: 6,
      name: "AWS Certification",
      type: "Certification",
      difficulty: "Medium",
      description: `Amazon Web Services certification program for cloud computing professionals. Validates technical skills and expertise in AWS cloud platform.\n\nCovers cloud architecture, security, deployment, and various AWS services and best practices.`,
      duration: "130 minutes",
      fee: "$150",
      nextExamDate: "Available year-round",
      isPopular: false,
      preparationTips: [
        "Get hands-on experience with AWS services",
        "Use AWS free tier for practice",
        "Take official AWS training courses",
        "Practice with sample questions"
      ],
      syllabusUrl: "/assets/syllabus/aws-certification-syllabus.pdf"
    }
  ];

  // Mock data for internships
  const mockInternships = [
    {
      id: 1,
      position: "Software Development Intern",
      company: "Google",
      companyLogo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop&crop=center",
      location: "Bangalore, India",
      duration: "3-6 months",
      stipend: "₹80,000/month",
      deadline: "2024-12-15",
      status: "Open",
      skills: ["Python", "Java", "Data Structures", "Algorithms", "System Design"],
      description: `Join Google's engineering team and work on cutting-edge projects that impact billions of users worldwide. Gain experience in large-scale distributed systems.\n\nWork alongside experienced engineers on real products and contribute to meaningful projects while learning industry best practices.`,
      applicationTips: [
        "Showcase strong coding skills in interviews",
        "Prepare for system design questions",
        "Demonstrate problem-solving abilities",
        "Highlight relevant project experience"
      ],
      applicationUrl: "https://careers.google.com/internships"
    },
    {
      id: 2,
      position: "Data Science Intern",
      company: "Microsoft",
      companyLogo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop&crop=center",
      location: "Hyderabad, India",
      duration: "4-6 months",
      stipend: "₹75,000/month",
      deadline: "2024-11-30",
      status: "Open",
      skills: ["Python", "Machine Learning", "SQL", "Statistics", "Azure"],
      description: `Work with Microsoft's AI and Data Science teams on innovative machine learning projects. Gain experience with Azure cloud services and big data technologies.\n\nContribute to real-world AI solutions and learn from industry experts in a collaborative environment.`,
      applicationTips: [
        "Demonstrate ML project experience",
        "Show proficiency in Python and SQL",
        "Understand cloud computing concepts",
        "Prepare for technical case studies"
      ],
      applicationUrl: "https://careers.microsoft.com/internships"
    },
    {
      id: 3,
      position: "Frontend Developer Intern",
      company: "Flipkart",
      companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
      location: "Bangalore, India",
      duration: "2-4 months",
      stipend: "₹45,000/month",
      deadline: "2024-12-01",
      status: "Closing Soon",
      skills: ["React", "JavaScript", "HTML/CSS", "Redux", "Node.js"],
      description: `Join Flipkart's frontend team and work on user-facing features for India's largest e-commerce platform. Learn about scalable web development.\n\nGain experience in building responsive, performant web applications that serve millions of users daily.`,
      applicationTips: [
        "Build a strong portfolio of React projects",
        "Understand responsive design principles",
        "Show knowledge of performance optimization",
        "Demonstrate UI/UX design awareness"
      ],
      applicationUrl: "https://www.flipkartcareers.com/internships"
    },
    {
      id: 4,
      position: "Mobile App Development Intern",
      company: "Zomato",
      companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center",
      location: "Delhi, India",
      duration: "3-5 months",
      stipend: "₹40,000/month",
      deadline: "2024-11-25",
      status: "Open",
      skills: ["React Native", "Flutter", "iOS", "Android", "API Integration"],
      description: `Work on Zomato's mobile applications and contribute to features used by millions of food lovers. Learn about mobile app development at scale.\n\nGain experience in cross-platform development and understand the challenges of building consumer-facing mobile applications.`,
      applicationTips: [
        "Show mobile app development projects",
        "Understand cross-platform frameworks",
        "Demonstrate API integration skills",
        "Know mobile UI/UX best practices"
      ],
      applicationUrl: "https://www.zomato.com/careers/internships"
    },
    {
      id: 5,
      position: "DevOps Engineering Intern",
      company: "Paytm",
      companyLogo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center",
      location: "Noida, India",
      duration: "4-6 months",
      stipend: "₹50,000/month",
      deadline: "2024-12-10",
      status: "Open",
      skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "Linux"],
      description: `Join Paytm's DevOps team and learn about infrastructure automation, CI/CD pipelines, and cloud operations for fintech applications.\n\nGain hands-on experience with containerization, orchestration, and monitoring tools in a production environment.`,
      applicationTips: [
        "Show understanding of cloud platforms",
        "Demonstrate scripting abilities",
        "Know containerization concepts",
        "Understand CI/CD principles"
      ],
      applicationUrl: "https://jobs.paytm.com/internships"
    },
    {
      id: 6,
      position: "UI/UX Design Intern",
      company: "Swiggy",
      companyLogo: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop&crop=center",
      location: "Bangalore, India",
      duration: "2-4 months",
      stipend: "₹35,000/month",
      deadline: "2024-11-20",
      status: "Closing Soon",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
      description: `Work with Swiggy's design team to create intuitive user experiences for food delivery and related services. Learn about design thinking and user research.\n\nContribute to design systems and user interface improvements that enhance the experience for millions of users.`,
      applicationTips: [
        "Build a strong design portfolio",
        "Show user research experience",
        "Demonstrate prototyping skills",
        "Understand mobile-first design"
      ],
      applicationUrl: "https://careers.swiggy.com/internships"
    }
  ];

  // Mock data for upcoming deadlines
  const mockDeadlines = [
    {
      title: "Google SDE Intern",
      type: "Internship",
      date: "2024-12-15",
      description: "Software Development Engineer internship application deadline",
      actionText: "Apply Now",
      actionUrl: "https://careers.google.com/internships"
    },
    {
      title: "Microsoft Data Science Intern",
      type: "Internship",
      date: "2024-11-30",
      description: "Data Science internship program application closes",
      actionText: "Apply Now",
      actionUrl: "https://careers.microsoft.com/internships"
    },
    {
      title: "CAT 2024 Registration",
      type: "Exam",
      date: "2024-11-28",
      description: "Last date for CAT 2024 registration",
      actionText: "Register",
      actionUrl: "https://iimcat.ac.in"
    },
    {
      title: "Flipkart Frontend Intern",
      type: "Internship",
      date: "2024-12-01",
      description: "Frontend Developer internship application deadline",
      actionText: "Apply Now",
      actionUrl: "https://www.flipkartcareers.com/internships"
    },
    {
      title: "GATE 2025 Application",
      type: "Exam",
      date: "2024-12-05",
      description: "GATE 2025 application deadline approaching",
      actionText: "Apply",
      actionUrl: "https://gate.iisc.ac.in"
    },
    {
      title: "Zomato Mobile Dev Intern",
      type: "Internship",
      date: "2024-11-25",
      description: "Mobile App Development internship closes soon",
      actionText: "Apply Now",
      actionUrl: "https://www.zomato.com/careers/internships"
    }
  ];

  const [exams, setExams] = useState([]);
  const [interns, setInterns] = useState([]);


  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        //setLoading(true);
        const response = await axios.get('http://localhost:5000/api/exams');
        setExams(response.data)
        //console.log(response.data)
      } catch (err) {
        console.error('Error fetching roadmaps:', err);
      } finally {
        //setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        //setLoading(true);
        const response = await axios.get('http://localhost:5000/api/internships');
        setInterns(response.data)
        //console.log(response.data)
      } catch (err) {
        console.error('Error fetching roadmaps:', err);
      } finally {
        //setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  // Filter data based on active tab, search query, and filters
  useEffect(() => {
    const dataToFilter = activeTab === 'exams' ? exams : interns;

    let filtered = dataToFilter?.filter(item => {
      // Search filter
      const matchesSearch = searchQuery === '' ||
        item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        item?.position?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        item?.company?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        item?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());

      if (!matchesSearch) return false;

      // Apply specific filters based on tab
      if (activeTab === 'exams') {
        const matchesType = filters?.all === 'all' || item?.type?.toLowerCase() === filters?.all;
        const matchesDifficulty = filters?.difficulty === 'all' || item?.difficulty?.toLowerCase() === filters?.difficulty;
        return matchesType && matchesDifficulty;
      } else {
        const matchesLocation = filters?.location === 'all' ||
          item?.location?.toLowerCase()?.includes(filters?.location) ||
          (filters?.location === 'remote' && item?.location?.toLowerCase()?.includes('remote'));

        const matchesDuration = filters?.duration === 'all' || (() => {
          const duration = item?.duration?.toLowerCase();
          switch (filters?.duration) {
            case '1-3': return duration?.includes('1') || duration?.includes('2') || duration?.includes('3');
            case '3-6': return duration?.includes('3') || duration?.includes('4') || duration?.includes('5') || duration?.includes('6');
            case '6+': return duration?.includes('6') || duration?.includes('7') || duration?.includes('8');
            default: return true;
          }
        })();

        const matchesStipend = filters?.stipend === 'all' || (() => {
          const stipend = item?.stipend?.replace(/[₹,]/g, '');
          const amount = parseInt(stipend);
          switch (filters?.stipend) {
            case 'unpaid': return item?.stipend?.toLowerCase()?.includes('unpaid') || amount === 0;
            case '5000-15000': return amount >= 5000 && amount <= 15000;
            case '15000-30000': return amount >= 15000 && amount <= 30000;
            case '30000+': return amount >= 30000;
            default: return true;
          }
        })();

        return matchesLocation && matchesDuration && matchesStipend;
      }
    });

    setFilteredData(filtered);
  }, [activeTab, searchQuery, filters]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery('');
    setFilters({
      all: 'all',
      difficulty: 'all',
      location: 'all',
      duration: 'all',
      stipend: 'all'
    });
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      all: 'all',
      difficulty: 'all',
      location: 'all',
      duration: 'all',
      stipend: 'all'
    });
    setSearchQuery('');
  };

  const handleSyllabusDownload = (exam) => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = exam?.syllabusUrl || '#';
    link.download = `${exam?.name?.replace(/\s+/g, '-')?.toLowerCase()}-syllabus.pdf`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const handleExamDetails = (exam) => {
    window.open(`/exam-details/${exam?.id}`, '_blank');
  };

  const handleInternshipApply = (internship) => {
    window.open(internship?.applicationUrl, '_blank');
  };

  const handleInternshipDetails = (internship) => {
    window.open(`/internship-details/${internship?.id}`, '_blank');
  };

  const handleViewAllDeadlines = () => {
    // Navigate to dedicated deadlines page or show modal
    console.log('View all deadlines');
  };

  return (
    <>
      <Helmet>
        <title>Exams & Internships Hub - CSE Roadmap Hub</title>
        <meta name="description" content="Comprehensive hub for competitive exam preparation and internship opportunities. Access exam syllabi, preparation tips, internship applications, and upcoming deadlines." />
        <meta name="keywords" content="competitive exams, internships, GATE, CAT, placement preparation, career opportunities, exam syllabus, application deadlines" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <Breadcrumb />

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Exams & Internships Hub</h1>
                <p className="text-muted-foreground">Your gateway to competitive exams and career opportunities</p>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-accent mb-1">Stay Updated</h3>
                  <p className="text-sm text-accent/80">
                    Track application deadlines, download exam syllabi, and discover internship opportunities from top companies.
                    Use filters to find opportunities that match your interests and timeline.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filter Bar */}
              <FilterBar
                activeTab={activeTab}
                onTabChange={handleTabChange}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />

              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {activeTab === 'exams' ? 'Competitive Exams' : 'Internship Opportunities'}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {filteredData?.length} {filteredData?.length === 1 ? 'result' : 'results'} found
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    onClick={() => {
                      // Export filtered results as PDF
                      console.log('Export results');
                    }}
                  >
                    Export
                  </Button>
                </div>
              </div>

              {/* Content Grid */}
              {filteredData?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredData?.map((item) => (
                    activeTab === 'exams' ? (
                      <ExamCard
                        key={item?.id}
                        exam={item}
                        onSyllabusDownload={handleSyllabusDownload}
                        onViewDetails={handleExamDetails}
                      />
                    ) : (
                      <InternshipCard
                        key={item?.id}
                        internship={item}
                        onApply={handleInternshipApply}
                        onViewDetails={handleInternshipDetails}
                      />
                    )
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    iconName="RefreshCw"
                    iconPosition="left"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Deadlines Sidebar */}
            <div className="lg:col-span-1">
              <DeadlinesSidebar
                deadlines={mockDeadlines}
                onViewAll={handleViewAllDeadlines}
                className="sticky top-24"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ExamsInternshipsHub;