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
  const [selectedDay, setSelectedDay] = useState(1);
  const [todoItems, setTodoItems] = useState([]);
  const [itineraryData, setItineraryData] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  // 預設的大阪與大邱行程資料
  const defaultItineraryData = [
    {
      day: 1,
      date: "2025年7月4日 (星期五)",
      title: "大邱快閃與抵達大阪",
      events: [
        { id: 1, type: 'flight', time: '02:00 - 05:25', details: '搭乘 TW664 班機從台北 (TPE) 飛往大邱 (TAE)。' },
        { id: 2, type: 'activity', time: '05:25 - 07:00', details: '抵達大邱國際機場 (TAE)。辦理入境手續並領取行李。' },
        { id: 3, type: 'transport', time: '07:00 - 07:30', details: '前往大邱市區 (東城路商圈)。' },
        { id: 4, type: 'meal', time: '07:30 - 09:00', details: '大邱早餐與早晨探索 (東城路商圈)。推薦：Cafe Luide 或 Coffee Myungga。' },
        { id: 5, type: 'activity', time: '09:00 - 12:00', details: '大邱市區快閃：逛東城路商圈、參觀大邱近代胡同。' },
        { id: 6, type: 'meal', time: '12:00 - 13:00', details: '大邱午餐。推薦：烤腸、扁餃子、辣燉排骨。' },
        { id: 7, type: 'transport', time: '13:00 - 13:30', details: '從大邱市區返回大邱國際機場 (TAE)。' },
        { id: 8, type: 'flight', time: '15:25 - 17:00', details: '搭乘 TW313 班機從大邱 (TAE) 飛往大阪關西國際機場 (KIX)。' },
        { id: 9, type: 'lodging', time: '17:00 - 18:30', details: '前往位於 Chuo Ward, Osaka, 2-chōme-2-16 Shimanouchi 的住宿辦理入住。' },
        { id: 10, type: 'activity', time: '18:30 之後', details: '探索道頓堀與心齋橋，品嚐當地美食。晚餐推薦：一蘭拉麵、金龍拉麵。' }
      ]
    },
    {
      day: 2,
      date: "2025年7月5日 (星期六)",
      title: "大阪歷史與城市景觀",
      events: [
        { id: 11, type: 'activity', time: '上午', details: '參觀大阪城 (Osaka Castle) 及其周圍公園。' },
        { id: 12, type: 'activity', time: '下午', details: '登上梅田藍天大廈 (Umeda Sky Building) 空中庭園展望台。' },
        { id: 13, type: 'meal', time: '晚上', details: '在梅田地區享用晚餐。推薦：利久牛舌、HARBS。' }
      ]
    },
    {
      day: 3,
      date: "2025年7月6日 (星期日)",
      title: "大阪世界博覽會與道頓堀之夜",
      events: [
        { id: 14, type: 'activity', time: '全天', details: '前往位於夢洲 (Yumeshima) 的大阪世界博覽會 (Osaka World Expo 2025)。' },
        { id: 15, type: 'meal', time: '晚上', details: '在道頓堀 (Dotonbori) 享用晚餐。推薦：神座拉麵。' }
      ]
    },
    {
      day: 4,
      date: "2025年7月7日 (星期一)",
      title: "自由活動或近郊遊覽",
      events: [
        { id: 16, type: 'option', time: '全天', details: '選項一：自由活動或購物 (梅田、心齋橋、難波)。' },
        { id: 17, type: 'option', time: '全天', details: '選項二 (建議)：前往奈良 (Nara) 或京都 (Kyoto) 進行一日遊。' }
      ]
    },
    {
      day: 5,
      date: "2025年7月8日 (星期二)",
      title: "移居機場酒店與臨空城",
      events: [
        { id: 18, type: 'lodging', time: '上午', details: '於 Chuo Ward 的住宿辦理退房。' },
        { id: 19, type: 'lodging', time: '下午', details: '前往大阪關西機場奧德西斯套房酒店辦理入住。', address: '1 Rinkuoraikita, 598-0048 泉佐野市' },
        { id: 20, type: 'activity', time: '晚上', details: '在臨空城 (Rinku Town) Premium Outlets 購物。' }
      ]
    },
    {
      day: 6,
      date: "2025年7月9日 (星期三)",
      title: "返回台北",
      events: [
        { id: 21, type: 'lodging', time: '上午', details: '於大阪關西機場奧德西斯套房酒店辦理退房。' },
        { id: 22, type: 'flight', time: '12:25 - 14:25', details: '搭乘 VZ567 班機從大阪關西國際機場 (KIX) 飛回台北 (TPE)。' }
      ]
    }
  ];

  const eventIcons = {
    flight: '✈️',
    lodging: '🏨',
    activity: '🏯',
    option: '📌',
    transport: '🚗',
    meal: '🍴'
  };

  const eventColors = {
    flight: 'border-sky-500',
    lodging: 'border-emerald-500',
    activity: 'border-amber-500',
    option: 'border-violet-500',
    transport: 'border-blue-500',
    meal: 'border-pink-500'
  };

  // 初始化數據
  useEffect(() => {
    // 載入待辦清單
    const storedTodos = localStorage.getItem('travelTodoItems');
    if (storedTodos) {
      try {
        setTodoItems(JSON.parse(storedTodos));
      } catch (e) {
        console.error("載入待辦清單時發生錯誤:", e);
      }
    }

    // 載入行程資料 (如果有自訂修改)
    const storedItinerary = localStorage.getItem('editedItineraryData');
    if (storedItinerary) {
      try {
        setItineraryData(JSON.parse(storedItinerary));
      } catch (e) {
        console.error("載入行程資料時發生錯誤:", e);
        setItineraryData(defaultItineraryData);
      }
    } else {
      setItineraryData(defaultItineraryData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 儲存待辦清單
  useEffect(() => {
    localStorage.setItem('travelTodoItems', JSON.stringify(todoItems));
  }, [todoItems]);

  // 儲存行程資料
  useEffect(() => {
    localStorage.setItem('editedItineraryData', JSON.stringify(itineraryData));
  }, [itineraryData]);

  // 待辦清單管理功能
  const addTodoItem = (text) => {
    const newItem = {
      id: Date.now().toString(),
      text: text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodoItems(prev => [...prev, newItem]);
  };

  const updateTodoItem = (id, newText) => {
    setTodoItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, text: newText } : item
      )
    );
  };

  const toggleTodoItem = (id) => {
    setTodoItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // 行程編輯功能
  const updateEvent = (dayIndex, eventId, updatedEvent) => {
    setItineraryData(prev => 
      prev.map((day, index) => 
        index === dayIndex 
          ? {
              ...day,
              events: day.events.map(event => 
                event.id === eventId ? { ...event, ...updatedEvent } : event
              )
            }
          : day
      )
    );
  };

  const updateDayTitle = (dayIndex, newTitle) => {
    setItineraryData(prev => 
      prev.map((day, index) => 
        index === dayIndex ? { ...day, title: newTitle } : day
      )
    );
  };

  const showDay = (dayNumber) => {
    setSelectedDay(dayNumber);
  };

  // 重置為預設行程
  const resetToDefault = () => {
    if (window.confirm('確定要重置為預設行程嗎？所有修改將會遺失。')) {
      setItineraryData(defaultItineraryData);
      localStorage.removeItem('editedItineraryData');
    }
  };

  const value = {
    // 狀態
    selectedDay,
    setSelectedDay,
    todoItems,
    itineraryData,
    editingEvent,
    setEditingEvent,
    defaultItineraryData,
    eventIcons,
    eventColors,
    
    // 方法
    showDay,
    
    // 待辦清單方法
    addTodoItem,
    updateTodoItem,
    toggleTodoItem,
    
    // 行程編輯方法
    updateEvent,
    updateDayTitle,
    resetToDefault
  };

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
};