import React from 'react';
import Header from './components/Header';
import ItineraryPlanner from './components/ItineraryPlanner';
import TodoList from './components/TodoList';
import InfoPanel from './components/InfoPanel';
import Footer from './components/Footer';
import { ItineraryProvider } from './context/ItineraryContext';

function App() {
  return (
    <ItineraryProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* 行程規劃器 - 主要內容區 */}
            <div className="xl:col-span-3">
              <ItineraryPlanner />
            </div>
            
            {/* 側邊欄 - 待辦清單和旅行資訊 */}
            <div className="xl:col-span-1 space-y-6">
              {/* 行李準備清單 */}
              <TodoList />
              
              {/* 旅行資訊面板 */}
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
