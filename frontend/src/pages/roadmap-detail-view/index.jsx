import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import RoadmapHeader from './components/RoadmapHeader';
import StepsList from './components/StepsList';
import ProgressSummary from './components/ProgressSummary';


const RoadmapDetailView = () => {
  const [searchParams] = useSearchParams();
  const roadmapId = searchParams?.get('id') || 'dsa-fundamentals';
  
  const [completedSteps, setCompletedSteps] = useState(2);
  const [activeStepIndex, setActiveStepIndex] = useState(2);

  // Mock roadmap data - in real app, this would come from API
  const mockRoadmap = {
    id: 'dsa-fundamentals',
    title: 'Data Structures & Algorithms Fundamentals',
    description: `Master the core concepts of Data Structures and Algorithms that form the foundation of computer science. This comprehensive roadmap covers everything from basic arrays and linked lists to advanced graph algorithms and dynamic programming. Perfect for students preparing for technical interviews, competitive programming, or building a strong CS foundation.`,
    difficulty: 'Intermediate',
    duration: '12-16 weeks',
    enrolledCount: '15,420',
    tags: ['Programming', 'Problem Solving', 'Interview Prep', 'Computer Science', 'Algorithms'],
    relatedRoadmaps: [
      {
        title: 'System Design Fundamentals',
        difficulty: 'Advanced',
        duration: '8-10 weeks'
      },
      {
        title: 'Competitive Programming',
        difficulty: 'Advanced',
        duration: '16-20 weeks'
      },
      {
        title: 'Full Stack Development',
        difficulty: 'Intermediate',
        duration: '20-24 weeks'
      }
    ],
    steps: [
      {
        title: 'Introduction to Programming Fundamentals',
        description: 'Get familiar with basic programming concepts, time complexity analysis, and problem-solving approaches. Learn about Big O notation and how to analyze algorithm efficiency.',
        estimatedTime: '1-2 weeks',
        difficulty: 'Easy',
        prerequisites: ['Basic programming knowledge in any language'],
        resources: [
          {
            title: 'Big O Notation Explained',
            type: 'video',
            platform: 'YouTube',
            duration: '45 min',
            url: 'https://youtube.com/watch?v=example1',
            isExternal: true,
            isBookmarked: false
          },
          {
            title: 'Time Complexity Analysis Guide',
            type: 'article',
            platform: 'GeeksforGeeks',
            duration: '30 min read',
            url: 'https://geeksforgeeks.org/example1',
            isExternal: true,
            isBookmarked: true
          },
          {
            title: 'Basic Problem Solving Practice',
            type: 'practice',
            platform: 'LeetCode',
            duration: '2-3 hours',
            url: 'https://leetcode.com/example1',
            isExternal: true,
            isBookmarked: false
          }
        ],
        notes: 'Remember to focus on understanding the concepts rather than memorizing. Practice is key!'
      },
      {
        title: 'Arrays and Strings Mastery',
        description: 'Deep dive into array manipulation, string processing, and common patterns. Learn sliding window, two pointers, and other essential techniques for array-based problems.',
        estimatedTime: '2-3 weeks',
        difficulty: 'Easy',
        prerequisites: ['Understanding of basic programming constructs'],
        resources: [
          {
            title: 'Array Algorithms Masterclass',
            type: 'video',
            platform: 'Coursera',
            duration: '2 hours',
            url: 'https://coursera.org/example2',
            isExternal: true,
            isBookmarked: false
          },
          {
            title: 'String Manipulation Techniques',
            type: 'article',
            platform: 'Medium',
            duration: '25 min read',
            url: 'https://medium.com/example2',
            isExternal: true,
            isBookmarked: false
          },
          {
            title: 'Array Problems Practice Set',
            type: 'practice',
            platform: 'HackerRank',
            duration: '5-8 hours',
            url: 'https://hackerrank.com/example2',
            isExternal: true,
            isBookmarked: true
          },
          {
            title: 'Two Pointers Technique Quiz',
            type: 'quiz',
            platform: 'CodeChef',
            duration: '30 min',
            url: 'https://codechef.com/example2',
            isExternal: true,
            isBookmarked: false
          }
        ],
        notes: ''
      },
      {
        title: 'Linked Lists and Pointers',
        description: 'Master linked list operations, pointer manipulation, and solve classic problems like cycle detection, reversal, and merging. Understanding pointers is crucial for advanced data structures.',
        estimatedTime: '2 weeks',
        difficulty: 'Medium',
        prerequisites: ['Solid understanding of arrays', 'Basic pointer concepts'],
        resources: [
          {
            title: 'Linked Lists Comprehensive Guide',
            type: 'video',
            platform: 'edX',
            duration: '1.5 hours',
            url: 'https://edx.org/example3',
            isExternal: true,
            isBookmarked: false
          },
          {
            title: 'Pointer Arithmetic Deep Dive',
            type: 'article',
            platform: 'Stack Overflow',
            duration: '40 min read',
            url: 'https://stackoverflow.com/example3',
            isExternal: true,
            isBookmarked: false
          },
          {
            title: 'Linked List Problems Collection',
            type: 'practice',
            platform: 'LeetCode',
            duration: '6-10 hours',
            url: 'https://leetcode.com/example3',
            isExternal: true,
            isBookmarked: false
          },
          {
            title: 'Build a Simple Linked List',
            type: 'project',
            platform: 'GitHub',
            duration: '3-4 hours',
            url: 'https://github.com/example3',
            isExternal: true,
            isBookmarked: true
          }
        ],
        notes: ''
      },
      {
        title: 'Stacks and Queues Implementation',
        description: 'Learn about LIFO and FIFO data structures, their implementations, and applications. Solve problems involving parentheses matching, expression evaluation, and BFS/DFS preparation.',
        estimatedTime: '1-2 weeks',
        difficulty: 'Medium',
        prerequisites: ['Understanding of linked lists', 'Basic recursion concepts'],
        resources: [
          {
            title: 'Stacks and Queues Fundamentals',
            type: 'video',
            platform: 'Khan Academy',
            duration: '1 hour',
            url: 'https://khanacademy.org/example4',
            isExternal: true,
            isBookmarked: false
          },
          {
            title: 'Stack Applications in Real World',
            type: 'article',
            platform: 'Dev.to',
            duration: '20 min read',
            url: 'https://dev.to/example4',
            isExternal: true,
            isBookmarked: false
          },
          {
            title: 'Queue Implementation Challenge',
            type: 'practice',
            platform: 'Codewars',
            duration: '2-3 hours',
            url: 'https://codewars.com/example4',
            isExternal: true,
            isBookmarked: false
          }
        ],
        notes: ''
      },
      {
        title: 'Trees and Binary Search Trees',
        description: 'Explore hierarchical data structures, tree traversals, and binary search tree operations. Learn about balanced trees and their importance in maintaining optimal performance.',
        estimatedTime: '3 weeks',
        difficulty: 'Medium',
        prerequisites: ['Strong understanding of recursion', 'Familiarity with stacks and queues'],
        resources: [
          {
            title: 'Binary Trees Complete Course',
            type: 'video',
            platform: 'Udemy',
            duration: '3 hours',
            url: 'https://udemy.com/example5',
            isExternal: true,
            isBookmarked: true
          },
          {
            title: 'Tree Traversal Algorithms',
            type: 'article',
            platform: 'GeeksforGeeks',
            duration: '35 min read',
            url: 'https://geeksforgeeks.org/example5',
            isExternal: true,
            isBookmarked: false
          },
          {
            title: 'BST Problems Marathon',
            type: 'practice',
            platform: 'InterviewBit',
            duration: '8-12 hours',
            url: 'https://interviewbit.com/example5',
            isExternal: true,
            isBookmarked: false
          },
          {
            title: 'Tree Visualization Tool',
            type: 'project',
            platform: 'CodePen',
            duration: '4-6 hours',
            url: 'https://codepen.io/example5',
            isExternal: true,
            isBookmarked: false
          }
        ],
        notes: ''
      },
      {
        title: 'Graph Algorithms and Traversals',
        description: 'Master graph representation, BFS, DFS, and pathfinding algorithms. Learn about topological sorting, minimum spanning trees, and shortest path algorithms like Dijkstra.',
        estimatedTime: '3-4 weeks',
        difficulty: 'Advanced',
        prerequisites: ['Strong tree concepts', 'Understanding of queues and stacks', 'Basic graph theory'],
        resources: [
          {
            title: 'Graph Theory Masterclass',
            type: 'video',
            platform: 'MIT OpenCourseWare',
            duration: '4 hours',
            url: 'https://ocw.mit.edu/example6',
            isExternal: true,
            isBookmarked: false
          },
          {
            title: 'Dijkstra Algorithm Explained',
            type: 'article',
            platform: 'Wikipedia',
            duration: '45 min read',
            url: 'https://wikipedia.org/example6',
            isExternal: true,
            isBookmarked: false
          },
          {
            title: 'Graph Problems Collection',
            type: 'practice',
            platform: 'Codeforces',
            duration: '15-20 hours',
            url: 'https://codeforces.com/example6',
            isExternal: true,
            isBookmarked: true
          },
          {
            title: 'Graph Algorithms Quiz',
            type: 'quiz',
            platform: 'HackerEarth',
            duration: '1 hour',
            url: 'https://hackerearth.com/example6',
            isExternal: true,
            isBookmarked: false
          }
        ],
        notes: ''
      },
      {
        title: 'Dynamic Programming Fundamentals',
        description: 'Learn the art of breaking down complex problems into simpler subproblems. Master memoization, tabulation, and classic DP patterns for optimization problems.',
        estimatedTime: '4-5 weeks',
        difficulty: 'Advanced',
        prerequisites: ['Strong problem-solving skills', 'Understanding of recursion', 'Mathematical thinking'],
        resources: [
          {
            title: 'Dynamic Programming Demystified',
            type: 'video',
            platform: 'YouTube',
            duration: '2.5 hours',
            url: 'https://youtube.com/example7',
            isExternal: true,
            isBookmarked: false
          },
          {
            title: 'DP Patterns and Techniques',
            type: 'article',
            platform: 'LeetCode Discuss',
            duration: '1 hour read',
            url: 'https://leetcode.com/discuss/example7',
            isExternal: true,
            isBookmarked: true
          },
          {
            title: 'Classic DP Problems Set',
            type: 'practice',
            platform: 'AtCoder',
            duration: '20-25 hours',
            url: 'https://atcoder.jp/example7',
            isExternal: true,
            isBookmarked: false
          },
          {
            title: 'DP Visualization Project',
            type: 'project',
            platform: 'Observable',
            duration: '6-8 hours',
            url: 'https://observablehq.com/example7',
            isExternal: true,
            isBookmarked: false
          }
        ],
        notes: ''
      }
    ]
  };

  const handleToggleStepComplete = (stepIndex, isCompleted) => {
    if (isCompleted && stepIndex === completedSteps) {
      setCompletedSteps(completedSteps + 1);
      setActiveStepIndex(completedSteps + 1);
    } else if (!isCompleted && stepIndex === completedSteps - 1) {
      setCompletedSteps(completedSteps - 1);
      setActiveStepIndex(completedSteps - 1);
    }
  };

  const handleBookmarkResource = (stepIndex, resourceIndex) => {
    // In real app, this would update the backend
    console.log(`Bookmarked resource ${resourceIndex} in step ${stepIndex}`);
  };

  const handleAddNote = (stepIndex, note) => {
    // In real app, this would save to backend
    console.log(`Added note to step ${stepIndex}:`, note);
  };

  const handleDownloadPDF = () => {
    // In real app, this would generate and download PDF
    console.log('Downloading roadmap as PDF...');
  };

  const handleStepClick = (stepIndex) => {
    setActiveStepIndex(stepIndex);
    // Scroll to step
    const stepElement = document.getElementById(`step-${stepIndex}`);
    if (stepElement) {
      stepElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/', icon: 'Home' },
    { label: 'Roadmaps', path: '/roadmaps-catalog', icon: 'Map' },
    { label: mockRoadmap?.title, icon: 'MapPin', isLast: true }
  ];

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <Breadcrumb customItems={breadcrumbItems} />
        
        <div className="space-y-8">
          {/* Roadmap Header */}
          <RoadmapHeader 
            roadmap={mockRoadmap}
            onDownloadPDF={handleDownloadPDF}
          />

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Steps Content */}
            <div className="lg:col-span-2 space-y-6">
              <StepsList
                roadmap={mockRoadmap}
                completedSteps={completedSteps}
                onToggleStepComplete={handleToggleStepComplete}
                onBookmarkResource={handleBookmarkResource}
                onAddNote={handleAddNote}
                activeStepIndex={activeStepIndex}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ProgressSummary
                  roadmap={mockRoadmap}
                  completedSteps={completedSteps}
                  totalSteps={mockRoadmap?.steps?.length}
                  onStepClick={handleStepClick}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoadmapDetailView;