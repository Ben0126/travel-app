import React from 'react';
import Header from './components/Header';
import ItineraryPlanner from './components/ItineraryPlanner';
import InfoPanel from './components/InfoPanel';
import Footer from './components/Footer';
import { ItineraryProvider } from './context/ItineraryContext';

function App() {
  return (
    <ItineraryProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ItineraryPlanner />
            </div>
            <div>
              <InfoPanel />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ItineraryProvider>
  );
}

export default App;
