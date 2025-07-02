import React, { useState } from 'react';
import Header from './components/Header';
import ItineraryPlanner from './components/ItineraryPlanner';
import TodoList from './components/TodoList';
import InfoPanel from './components/InfoPanel';
import Footer from './components/Footer';
import { ItineraryProvider } from './context/ItineraryContext';

function App() {
  const [activeTab, setActiveTab] = useState('itinerary');

  const tabs = [
    { id: 'itinerary', label: '行程表', icon: '📅' },
    { id: 'guide', label: '旅行指南', icon: '📖' },
    { id: 'checklist', label: '行李清單', icon: '🧳' }
  ];

  return (
    <ItineraryProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <Header />
        
        {/* 手機版分頁導航 */}
        <div className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <main className="flex-grow container mx-auto p-4">
          {/* 桌面版布局：三欄式 */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-6">
            {/* 左側：旅行指南 */}
            <div className="lg:col-span-3">
              <InfoPanel />
            </div>
            
            {/* 中間：行程規劃器 */}
            <div className="lg:col-span-6">
              <ItineraryPlanner />
            </div>
            
            {/* 右側：行李清單 */}
            <div className="lg:col-span-3">
              <TodoList />
            </div>
          </div>

          {/* 手機版布局：分頁式 */}
          <div className="lg:hidden">
            {activeTab === 'itinerary' && (
              <div className="w-full">
                <ItineraryPlanner />
              </div>
            )}
            
            {activeTab === 'guide' && (
              <div className="w-full">
                <InfoPanel />
              </div>
            )}
            
            {activeTab === 'checklist' && (
              <div className="w-full">
                <TodoList />
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </ItineraryProvider>
  );
}

export default App;
