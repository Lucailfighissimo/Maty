import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import LibraryPage from "./components/LibraryPage";
import MusicPlayer from "./components/MusicPlayer";
import { mockCurrentTrack } from "./mockData";

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrack, setCurrentTrack] = useState(mockCurrentTrack);
  const [isPlaying, setIsPlaying] = useState(false);

  const renderMainContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <HomePage 
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        );
      case 'search':
        return (
          <SearchPage 
            searchQuery={searchQuery}
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        );
      case 'library':
        return <LibraryPage />;
      default:
        return (
          <HomePage 
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeSection={activeSection}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {renderMainContent()}
        </main>
        
        {/* Music Player */}
        <MusicPlayer 
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>
    </div>
  );
}

export default App;
