import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import QuickLinksGrid from './components/QuickLinksGrid';
import FeaturedRoadmapCard from './components/FeaturedRoadmapCard';
import TopResourcesGrid from './components/TopResourcesGrid';
import StatsSection from './components/StatsSection';
import Footer from './components/Footer';

const HomeDashboard = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="w-full">
        <HeroSection />
        <QuickLinksGrid />
        <FeaturedRoadmapCard />
        <TopResourcesGrid />
        <StatsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomeDashboard;