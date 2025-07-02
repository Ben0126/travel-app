import React from 'react';
import { useItinerary } from '../context/ItineraryContext';
import ItineraryStats from './ItineraryStats';
import ItineraryExport from './ItineraryExport';

const ItineraryPlanner = () => {
  const {
    view,
    selectedDay,
    customItineraries,
    currentItem,
    isEditing,
    error,
    defaultItineraryData,
    eventIcons,
    eventColors,
    handleInputChange,
    handleAddItem,
    handleUpdateItem,
    handleDeleteItem,
    handleEditClick,
    resetForm,
    showDay
  } = useItinerary();

  const createEventCard = (event) => {
    return (
      <div key={`${event.type}-${event.time}-${event.details.substring(0, 20)}`} 
           className={`event-card bg-gray-50 rounded-lg p-4 flex items-start gap-4 ${eventColors[event.type]}`}>
        <div className="text-2xl">{eventIcons[event.type]}</div>
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{event.time}</p>
          <p className="text-gray-600">{event.details}</p>
          {event.address && (
            <p className="text-xs text-gray-500 mt-1">地址: {event.address}</p>
          )}
        </div>
      </div>
    );
  };

  const renderDayContent = () => {
    const dayData = defaultItineraryData.find(d => d.day === selectedDay);
    if (!dayData) return null;

    return (
      <div className="day-content" id={`day-${selectedDay}`}>
        <div className="pb-4 mb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{dayData.title}</h2>
          <p className="text-md text-gray-500">{dayData.date}</p>
        </div>
        <div className="space-y-4">
          {dayData.events.map(createEventCard)}
        </div>
      </div>
    );
  };

  if (view === 'overview') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* 概覽統計 */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <p className="text-2xl font-bold text-primary-500">6</p>
            <p className="text-sm text-gray-500">天</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <p className="text-2xl font-bold text-primary-500">2</p>
            <p className="text-sm text-gray-500">個城市</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <p className="text-2xl font-bold text-primary-500">3</p>
            <p className="text-sm text-gray-500">趟航班</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <p className="text-2xl font-bold text-primary-500">2</p>
            <p className="text-sm text-gray-500">間住宿</p>
          </div>
        </section>

        {/* 日期導航 */}
        <nav className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {defaultItineraryData.map(day => (
            <button
              key={day.day}
              onClick={() => showDay(day.day)}
              className={`day-btn font-semibold py-2 px-4 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-100 hover:text-primary-500 ${
                selectedDay === day.day 
                  ? 'active-day-btn' 
                  : 'bg-white text-gray-700'
              }`}
            >
              第 {day.day} 天
            </button>
          ))}
        </nav>
        
        {/* 日程內容 */}
        <main className="bg-gray-50 p-6 rounded-xl border border-gray-200 min-h-[400px]">
          {renderDayContent()}
        </main>
      </div>
    );
  }

  // 自定義行程管理視圖
  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">錯誤：</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* 行程統計組件 */}
      <ItineraryStats 
        itineraries={customItineraries} 
        defaultItinerary={defaultItineraryData} 
      />

      {/* 行程匯入/匯出組件 */}
      <ItineraryExport 
        itineraries={customItineraries} 
        defaultItinerary={defaultItineraryData} 
      />

      {/* 新增/編輯行程項目的表單 */}
      <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {isEditing ? '編輯行程項目' : '新增行程項目'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">日期</label>
            <input
              type="date"
              id="date"
              name="date"
              value={currentItem.date}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">時間 (選填)</label>
            <input
              type="time"
              id="time"
              name="time"
              value={currentItem.time}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">地點</label>
            <input
              type="text"
              id="location"
              name="location"
              value={currentItem.location}
              onChange={handleInputChange}
              placeholder="例如：大阪城、關西機場"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">描述</label>
            <textarea
              id="description"
              name="description"
              value={currentItem.description}
              onChange={handleInputChange}
              rows="3"
              placeholder="例如：參觀天守閣、搭乘 TW664 班機"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">類型</label>
            <select
              id="type"
              name="type"
              value={currentItem.type}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="活動">活動</option>
              <option value="航班">航班</option>
              <option value="住宿">住宿</option>
              <option value="交通">交通</option>
              <option value="餐飲">餐飲</option>
              <option value="購物">購物</option>
              <option value="其他">其他</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdateItem}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                儲存變更
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                取消
              </button>
            </>
          ) : (
            <button
              onClick={handleAddItem}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              新增行程
            </button>
          )}
        </div>
      </div>

      {/* 自定義行程列表 */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">我的自定義行程</h2>
        {customItineraries.length === 0 ? (
          <p className="text-gray-600 text-center py-8">目前沒有自定義行程項目。請新增一個！</p>
        ) : (
          <div className="space-y-4">
            {customItineraries.map((item) => (
              <div key={item.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex-grow mb-2 sm:mb-0">
                  <p className="text-lg font-bold text-gray-900">{item.date} {item.time && `(${item.time})`}</p>
                  <p className="text-md text-gray-800">{item.location}</p>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mt-1">
                    {item.type}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition duration-150 ease-in-out text-sm"
                  >
                    編輯
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition duration-150 ease-in-out text-sm"
                  >
                    刪除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryPlanner;
