import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomeDashboard from './pages/home-dashboard';
import NotesRepository from './pages/notes-repository';
import RoadmapsCatalog from './pages/roadmaps-catalog';
import ExamsInternshipsHub from './pages/exams-internships-hub';
import RoadmapDetailView from './pages/roadmap-detail-view';
import ContactSuggestions from './pages/contact-suggestions';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/notes-repository" element={<NotesRepository />} />
        <Route path="/roadmaps-catalog" element={<RoadmapsCatalog />} />
        <Route path="/exams-internships-hub" element={<ExamsInternshipsHub />} />
        <Route path="/roadmap-detail-view" element={<RoadmapDetailView />} />
        <Route path="/contact-suggestions" element={<ContactSuggestions />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
