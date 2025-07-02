import React, { useState } from 'react';
import { useItinerary } from '../context/ItineraryContext';

const ItineraryPlanner = () => {
  const {
    selectedDay,
    itineraryData,
    eventIcons,
    eventColors,
    showDay,
    updateEvent,
    updateDayTitle,
    resetToDefault
  } = useItinerary();

  const [editingDayTitle, setEditingDayTitle] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editValues, setEditValues] = useState({});

  // 開始編輯日期標題
  const startEditingDayTitle = (dayIndex, currentTitle) => {
    setEditingDayTitle(dayIndex);
    setEditValues({ title: currentTitle });
  };

  // 儲存日期標題
  const saveDayTitle = (dayIndex) => {
    if (editValues.title?.trim()) {
      updateDayTitle(dayIndex, editValues.title.trim());
    }
    setEditingDayTitle(null);
    setEditValues({});
  };

  // 開始編輯事件
  const startEditingEvent = (dayIndex, eventId, event) => {
    setEditingEvent({ dayIndex, eventId });
    setEditValues({
      time: event.time || '',
      details: event.details || '',
      address: event.address || ''
    });
  };

  // 儲存事件編輯
  const saveEvent = () => {
    const { dayIndex, eventId } = editingEvent;
    const updatedEvent = {
      time: editValues.time || '',
      details: editValues.details || '',
      address: editValues.address || ''
    };
    updateEvent(dayIndex, eventId, updatedEvent);
    setEditingEvent(null);
    setEditValues({});
  };

  // 取消編輯
  const cancelEdit = () => {
    setEditingDayTitle(null);
    setEditingEvent(null);
    setEditValues({});
  };

  // 創建事件卡片（可編輯版本）
  const createEventCard = (event, dayIndex) => {
    const isEditing = editingEvent?.dayIndex === dayIndex && editingEvent?.eventId === event.id;
    
    return (
      <div key={event.id} 
           className={`event-card bg-white rounded-lg p-4 border-l-4 ${eventColors[event.type]} shadow-sm hover:shadow-md transition-all duration-200 group`}>
        <div className="flex items-start gap-4">
          <div className="text-2xl flex-shrink-0">{eventIcons[event.type]}</div>
          
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">時間</label>
                  <input
                    type="text"
                    value={editValues.time}
                    onChange={(e) => setEditValues(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="例如：09:00 - 12:00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">活動詳情</label>
                  <textarea
                    value={editValues.details}
                    onChange={(e) => setEditValues(prev => ({ ...prev, details: e.target.value }))}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="請輸入活動詳情..."
                  />
                </div>
                {event.address !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">地址</label>
                    <input
                      type="text"
                      value={editValues.address}
                      onChange={(e) => setEditValues(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="請輸入地址..."
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={saveEvent}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    儲存
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-800">{event.time}</p>
                  <button
                    onClick={() => startEditingEvent(dayIndex, event.id, event)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-blue-600 hover:bg-blue-100 rounded transition-all duration-200"
                    title="編輯事件"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600 mt-1">{event.details}</p>
                {event.address && (
                  <p className="text-xs text-gray-500 mt-2 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.address}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // 渲染日程內容
  const renderDayContent = () => {
    const dayData = itineraryData.find(d => d.day === selectedDay);
    if (!dayData) return null;

    const dayIndex = itineraryData.findIndex(d => d.day === selectedDay);
    const isEditingTitle = editingDayTitle === dayIndex;

    return (
      <div className="day-content" id={`day-${selectedDay}`}>
        <div className="pb-6 mb-6 border-b border-gray-200">
          <div className="flex items-center justify-between group">
            {isEditingTitle ? (
              <div className="flex-1">
                <input
                  type="text"
                  value={editValues.title}
                  onChange={(e) => setEditValues(prev => ({ ...prev, title: e.target.value }))}
                  className="text-2xl font-bold text-gray-800 bg-transparent border-b-2 border-blue-500 focus:outline-none w-full"
                  autoFocus
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => saveDayTitle(dayIndex)}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    儲存
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 text-sm bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{dayData.title}</h2>
                  <p className="text-md text-gray-500">{dayData.date}</p>
                </div>
                <button
                  onClick={() => startEditingDayTitle(dayIndex, dayData.title)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-blue-600 hover:bg-blue-100 rounded transition-all duration-200"
                  title="編輯標題"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="space-y-4">
          {dayData.events.map(event => createEventCard(event, dayIndex))}
        </div>
      </div>
    );
  };

  // 計算統計數據
  const stats = {
    totalDays: itineraryData.length,
    cities: 2, // 大阪和大邱
    flights: itineraryData.reduce((acc, day) => 
      acc + day.events.filter(event => event.type === 'flight').length, 0
    ),
    accommodations: itineraryData.reduce((acc, day) => 
      acc + day.events.filter(event => event.type === 'lodging').length, 0
    )
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* 頂部操作列 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">🗾 行程總覽</h1>
        <button
          onClick={resetToDefault}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2"
          title="重置為預設行程"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          重置行程
        </button>
      </div>

      {/* 統計卡片 */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.totalDays}</p>
          <p className="text-sm text-blue-700">天數</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-emerald-600">{stats.cities}</p>
          <p className="text-sm text-emerald-700">個城市</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-amber-600">{stats.flights}</p>
          <p className="text-sm text-amber-700">趟航班</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-purple-600">{stats.accommodations}</p>
          <p className="text-sm text-purple-700">間住宿</p>
        </div>
      </section>

      {/* 編輯提示 */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
        <div className="flex items-center text-blue-800">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">
            💡 提示：將滑鼠移至標題或事件上方，點擊編輯圖示即可修改內容
          </span>
        </div>
      </div>

      {/* 日期導航 */}
      <nav className="flex flex-wrap justify-center gap-3 mb-8">
        {itineraryData.map(day => (
          <button
            key={day.day}
            onClick={() => showDay(day.day)}
            className={`day-btn font-semibold py-3 px-5 rounded-lg shadow-sm border-2 transition-all duration-200 ${
              selectedDay === day.day 
                ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105' 
                : 'bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            第 {day.day} 天
          </button>
        ))}
      </nav>
      
      {/* 日程內容 */}
      <main className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 min-h-[500px]">
        {renderDayContent()}
      </main>
    </div>
  );
};

export default ItineraryPlanner;
