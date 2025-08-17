import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import ExamList from './pages/exams/ExamList';
import ExamForm from './pages/exams/ExamForm';
import InternshipList from './pages/internships/InternshipList';
import InternshipForm from './pages/internships/InternshipForm';
import NoteList from './pages/notes/NoteList';
import NoteForm from './pages/notes/NoteForm';
import RoadmapList from './pages/roadmaps/RoadmapList';
import RoadmapForm from './pages/roadmaps/RoadmapForm';
import SyllabusList from './pages/syllabi/SyllabusList';
import SyllabusForm from './pages/syllabi/SyllabusForm';
import TopResourceList from './pages/top-resources/TopResourceList';
import TopResourceForm from './pages/top-resources/TopResourceForm';
import Layout from './layouts/Layout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Exams Routes */}
              <Route path="/exams" element={<ExamList />} />
              <Route path="/exams/new" element={<ExamForm />} />
              <Route path="/exams/:id/edit" element={<ExamForm />} />
              
              {/* Internships Routes */}
              <Route path="/internships" element={<InternshipList />} />
              <Route path="/internships/new" element={<InternshipForm />} />
              <Route path="/internships/:id/edit" element={<InternshipForm />} />
              
              {/* Notes Routes */}
              <Route path="/notes" element={<NoteList />} />
              <Route path="/notes/new" element={<NoteForm />} />
              <Route path="/notes/:id/edit" element={<NoteForm />} />
              
              {/* Roadmaps Routes */}
              <Route path="/roadmaps" element={<RoadmapList />} />
              <Route path="/roadmaps/new" element={<RoadmapForm />} />
              <Route path="/roadmaps/:id/edit" element={<RoadmapForm />} />
              
              {/* Syllabi Routes */}
              <Route path="/syllabi" element={<SyllabusList />} />
              <Route path="/syllabi/new" element={<SyllabusForm />} />
              <Route path="/syllabi/:id/edit" element={<SyllabusForm />} />
              
              {/* Top Resources Routes */}
              <Route path="/top-resources" element={<TopResourceList />} />
              <Route path="/top-resources/new" element={<TopResourceForm />} />
              <Route path="/top-resources/:id/edit" element={<TopResourceForm />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;