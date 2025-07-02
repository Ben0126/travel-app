import React, { useState, useEffect } from 'react';
import ItineraryExport from './components/ItineraryExport';
import ItineraryStats from './components/ItineraryStats';

function App() {
  const [view, setView] = useState('overview'); // 'overview' 或 'manager'
  const [selectedDay, setSelectedDay] = useState(1);
  const [customItineraries, setCustomItineraries] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    id: null,
    date: '',
    time: '',
    location: '',
    description: '',
    type: '活動'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  // 預設的大阪與大邱行程資料
  const defaultItineraryData = [
    {
      day: 1,
      date: "2025年7月4日 (星期五)",
      title: "抵達大阪",
      events: [
        { type: 'flight', time: '02:00 - 05:25', details: '搭乘 TW664 班機從台北 (TPE) 飛往大邱 (TAE)。' },
        { type: 'flight', time: '15:25 - 17:00', details: '搭乘 TW313 班機從大邱 (TAE) 飛往大阪關西國際機場 (KIX)。' },
        { type: 'lodging', time: '傍晚', details: '前往 Chuo Ward, Osaka 的住宿辦理入住。', address: '2-chōme-2-16 Shimanouchi' },
        { type: 'activity', time: '晚上', details: '探索道頓堀 (Dotonbori) 與心齋橋 (Shinsaibashi)，品嚐當地美食。' }
      ]
    },
    {
      day: 2,
      date: "2025年7月5日 (星期六)",
      title: "大阪探索",
      events: [
        { type: 'activity', time: '上午', details: '參觀大阪城 (Osaka Castle) 及其周圍公園。' },
        { type: 'activity', time: '下午', details: '登上梅田藍天大廈 (Umeda Sky Building) 空中庭園展望台。' },
        { type: 'activity', time: '晚上', details: '在梅田地區享用晚餐，體驗大阪夜生活。' }
      ]
    },
    {
      day: 3,
      date: "2025年7月6日 (星期日)",
      title: "主題樂園或文化體驗",
      events: [
        { type: 'option', time: '全天', details: '選項一：前往日本環球影城 (Universal Studios Japan)。' },
        { type: 'option', time: '全天', details: '選項二：探索難波、黑門市場及新世界。' }
      ]
    },
    {
      day: 4,
      date: "2025年7月7日 (星期一)",
      title: "自由活動或近郊遊覽",
      events: [
        { type: 'option', time: '全天', details: '選項一：自由活動或購物。' },
        { type: 'option', time: '全天', details: '選項二 (建議)：前往奈良 (Nara) 或京都 (Kyoto) 進行一日遊。' }
      ]
    },
    {
      day: 5,
      date: "2025年7月8日 (星期二)",
      title: "移居機場酒店",
      events: [
        { type: 'lodging', time: '上午', details: '於 Chuo Ward 的住宿辦理退房。' },
        { type: 'lodging', time: '下午', details: '前往大阪關西機場奧德西斯套房酒店辦理入住。', address: '1 Rinkuoraikita, 泉佐野市' },
        { type: 'activity', time: '晚上', details: '在臨空城 (Rinku Town) Outlet 逛逛或在酒店休息。' }
      ]
    },
    {
      day: 6,
      date: "2025年7月9日 (星期三)",
      title: "返回台北",
      events: [
        { type: 'lodging', time: '上午', details: '於大阪關西機場奧德西斯套房酒店辦理退房。' },
        { type: 'flight', time: '12:25 - 14:25', details: '搭乘 VZ567 班機從大阪 (KIX) 飛回台北 (TPE)。' }
      ]
    }
  ];

  const eventIcons = {
    flight: '✈️',
    lodging: '🏨',
    activity: '🏯',
    option: '📌'
  };

  const eventColors = {
    flight: 'border-sky-500',
    lodging: 'border-emerald-500',
    activity: 'border-amber-500',
    option: 'border-violet-500'
  };

  // 載入自定義行程資料
  useEffect(() => {
    const storedItineraries = localStorage.getItem('customTravelItineraries');
    if (storedItineraries) {
      try {
        const parsedItems = JSON.parse(storedItineraries);
        setCustomItineraries(parsedItems);
      } catch (e) {
        console.error("解析 localStorage 資料時發生錯誤:", e);
        setError("載入自定義行程資料時發生錯誤。");
      }
    }
  }, []);

  // 儲存自定義行程資料
  useEffect(() => {
    localStorage.setItem('customTravelItineraries', JSON.stringify(customItineraries));
  }, [customItineraries]);

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

  const showDay = (dayNumber) => {
    setSelectedDay(dayNumber);
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

  // 自定義行程管理功能
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const validateForm = () => {
    if (!currentItem.date || !currentItem.location || !currentItem.description) {
      setError("日期、地點和描述為必填項目。");
      return false;
    }
    setError(null);
    return true;
  };

  const handleAddItem = () => {
    if (!validateForm()) return;

    const newItem = { ...currentItem, id: Date.now().toString() };
    setCustomItineraries((prev) => {
      const updated = [...prev, newItem];
      updated.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time || '00:00'}`);
        const dateB = new Date(`${b.date}T${b.time || '00:00'}`);
        return dateA - dateB;
      });
      return updated;
    });
    resetForm();
  };

  const handleUpdateItem = () => {
    if (!validateForm()) return;
    if (!currentItem.id) {
      setError("項目 ID 遺失。無法更新。");
      return;
    }

    setCustomItineraries((prev) => {
      const updated = prev.map((item) =>
        item.id === currentItem.id ? { ...currentItem } : item
      );
      updated.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time || '00:00'}`);
        const dateB = new Date(`${b.date}T${b.time || '00:00'}`);
        return dateA - dateB;
      });
      return updated;
    });
    resetForm();
  };

  const handleDeleteItem = (id) => {
    if (!window.confirm("您確定要刪除此行程項目嗎？")) {
      return;
    }
    setCustomItineraries((prev) => prev.filter((item) => item.id !== id));
    resetForm();
  };

  const handleEditClick = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const resetForm = () => {
    setCurrentItem({
      id: null,
      date: '',
      time: '',
      location: '',
      description: '',
      type: '活動'
    });
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="min-h-screen antialiased">
      <div className="container mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-500">日本大阪與大邱之旅</h1>
          <p className="mt-2 text-lg text-gray-600">您的個人化互動行程表</p>
          
          {/* 切換視圖的按鈕 */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setView('overview')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                view === 'overview' 
                  ? 'bg-primary-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              行程概覽
            </button>
            <button
              onClick={() => setView('manager')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                view === 'manager' 
                  ? 'bg-primary-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              自定義行程
            </button>
          </div>
        </header>

        {view === 'overview' ? (
          // 行程概覽視圖
          <>
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
            
            <main className="bg-white p-6 rounded-xl shadow-md border border-gray-200 min-h-[400px]">
              {renderDayContent()}
            </main>
          </>
        ) : (
          // 自定義行程管理視圖
          <div className="max-w-4xl mx-auto">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
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
            <div className="mb-8 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
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
        )}
      </div>
    </div>
  );
}

export default App;
