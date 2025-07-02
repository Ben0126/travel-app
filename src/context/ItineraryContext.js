import React, { createContext, useContext, useState, useEffect } from 'react';

const ItineraryContext = createContext();

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
};

export const ItineraryProvider = ({ children }) => {
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

  // 行程管理功能
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

  const showDay = (dayNumber) => {
    setSelectedDay(dayNumber);
  };

  const value = {
    // 狀態
    view,
    setView,
    selectedDay,
    setSelectedDay,
    customItineraries,
    setCustomItineraries,
    currentItem,
    setCurrentItem,
    isEditing,
    setIsEditing,
    error,
    setError,
    defaultItineraryData,
    eventIcons,
    eventColors,
    // 方法
    handleInputChange,
    validateForm,
    handleAddItem,
    handleUpdateItem,
    handleDeleteItem,
    handleEditClick,
    resetForm,
    showDay
  };

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
};