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
        { id: 1, type: 'flight', time: '02:00 - 05:25', details: '搭乘 TW664 班機從台北 (TPE) 飛往大邱 (TAE)。紅眼航班，請確保登機前有足夠休息。' },
        { id: 2, type: 'activity', time: '05:25 - 07:00', details: '抵達大邱國際機場 (TAE)。辦理入境手續，注意行李是否能直掛到大阪KIX。' },
        { id: 3, type: 'transport', time: '07:00 - 07:30', details: '搭乘大邱地鐵1號線前往市區。機場站→中央路站/半月堂站 (東城路商圈)。' },
        { id: 4, type: 'meal', time: '07:30 - 09:00', details: '大邱早餐：Cafe Luide 或 Coffee Myungga。體驗當地咖啡文化。' },
        { id: 5, type: 'activity', time: '09:00 - 12:00', details: '大邱市區快閃：東城路商圈購物、大邱近代胡同探索，感受韓國傳統與現代的融合。' },
        { id: 6, type: 'meal', time: '12:00 - 13:00', details: '大邱特色午餐：烤腸 (막창)、扁餃子 (납작만두)、辣燉排骨 (갈비찜)。' },
        { id: 7, type: 'transport', time: '13:00 - 13:30', details: '返回大邱國際機場。建議預留2小時辦理登機手續。使用地鐵1號線或計程車。' },
        { id: 8, type: 'flight', time: '15:25 - 17:00', details: '搭乘 TW313 班機從大邱 (TAE) 飛往大阪關西國際機場 (KIX)。約1小時35分鐘飛行時間。' },
        { id: 9, type: 'transport', time: '17:00 - 18:30', details: '關西機場→心齋橋住宿。建議搭乘南海電鐵特急Rapi:t (38分鐘到難波) 或空港急行 (45-50分鐘)。' },
        { id: 10, type: 'lodging', time: '18:30', details: '入住 Chuo Ward, 2-chōme-2-16 Shimanouchi 住宿，靠近心齋橋/難波區域。' },
        { id: 11, type: 'activity', time: '19:00 之後', details: '探索道頓堀與心齋橋夜景。晚餐推薦：一蘭拉麵、金龍拉麵、章魚燒名店。' }
      ]
    },
    {
      day: 2,
      date: "2025年7月5日 (星期六)",
      title: "大阪歷史與城市景觀",
      events: [
        { id: 12, type: 'activity', time: '09:00 - 12:00', details: '參觀大阪城 (Osaka Castle) 及大阪城公園。搭乘地鐵到大阪城公園站或森之宮站。' },
        { id: 13, type: 'meal', time: '12:00 - 13:30', details: '大阪城附近午餐：大阪燒、串炸或在大阪城公園野餐。' },
        { id: 14, type: 'activity', time: '14:00 - 17:00', details: '前往梅田藍天大廈 (Umeda Sky Building)。登上空中庭園展望台欣賞360度大阪全景。' },
        { id: 15, type: 'meal', time: '17:30 - 19:00', details: '梅田地區晚餐：利久牛舌、HARBS蛋糕、阪急百貨美食街探索。' },
        { id: 16, type: 'activity', time: '19:00 之後', details: '梅田地下街購物或返回道頓堀夜遊。體驗大阪夜生活。' }
      ]
    },
    {
      day: 3,
      date: "2025年7月6日 (星期日)",
      title: "大阪世界博覽會",
      events: [
        { id: 17, type: 'transport', time: '08:00 - 09:30', details: '前往夢洲大阪世博會場。搭乘地鐵中央線→宇宙廣場站→轉乘世博線或接駁巴士。' },
        { id: 18, type: 'activity', time: '09:30 - 18:00', details: '大阪世界博覽會 2025 完整體驗。探索各國展館、創新科技展示、文化表演。' },
        { id: 19, type: 'meal', time: '12:00 - 13:00', details: '世博會場內午餐：體驗國際美食廣場，品嚐各國特色料理。' },
        { id: 20, type: 'transport', time: '18:00 - 19:00', details: '從世博會場返回市區。建議前往道頓堀用晚餐。' },
        { id: 21, type: 'meal', time: '19:00 - 21:00', details: '道頓堀 (Dotonbori) 晚餐：神座拉麵、河豚料理或大阪燒名店。' },
        { id: 22, type: 'activity', time: '21:00 之後', details: '道頓堀夜景拍照，感受大阪最具代表性的霓虹燈景觀。' }
      ]
    },
    {
      day: 4,
      date: "2025年7月7日 (星期一)",
      title: "自由活動或近郊遊覽",
      events: [
        { id: 23, type: 'option', time: '全天選項一', details: '大阪市區深度遊：梅田、心齋橋、難波購物，大阪美食巡禮，新世界通天閣探索。' },
        { id: 24, type: 'option', time: '全天選項二', details: '奈良一日遊：搭乘近鐵奈良線前往奈良，奈良公園餵鹿、東大寺參拜、春日大社。' },
        { id: 25, type: 'option', time: '全天選項三', details: '京都一日遊：搭乘京阪電車或阪急電鐵，清水寺、金閣寺、嵐山竹林小徑。' },
        { id: 26, type: 'transport', time: '交通建議', details: '奈良：近鐵難波線 (45分鐘)。京都：京阪電車特急 (1小時) 或阪急電鐵 (45分鐘)。' }
      ]
    },
    {
      day: 5,
      date: "2025年7月8日 (星期二)",
      title: "移居機場酒店與臨空城",
      events: [
        { id: 27, type: 'lodging', time: '10:00 - 11:00', details: '於心齋橋住宿辦理退房，整理行李準備前往機場酒店。' },
        { id: 28, type: 'transport', time: '11:00 - 12:30', details: '前往關西機場：南海電鐵特急Rapi:t直達機場 (38分鐘) 最便捷。' },
        { id: 29, type: 'lodging', time: '12:30 - 14:00', details: '入住大阪關西機場奧德西斯套房酒店 (Hotel Nikko Kansai Airport)，位於航廈內非常便利。' },
        { id: 30, type: 'meal', time: '14:00 - 15:00', details: '機場酒店內或臨空城午餐。享受最後的日式料理。' },
        { id: 31, type: 'activity', time: '15:00 - 19:00', details: '臨空城 (Rinku Town) Premium Outlets 購物。最後採購紀念品和免稅商品。' },
        { id: 32, type: 'meal', time: '19:00 - 20:30', details: '臨空城晚餐：outlet美食廣場或回機場酒店餐廳用餐。' },
        { id: 33, type: 'activity', time: '20:30 之後', details: '機場酒店休息，準備隔日早班機。整理行李確認重量。' }
      ]
    },
    {
      day: 6,
      date: "2025年7月9日 (星期三)",
      title: "返回台北",
      events: [
        { id: 34, type: 'lodging', time: '09:00 - 10:00', details: '機場酒店退房。由於位於航廈內，步行即可到登機櫃台。' },
        { id: 35, type: 'activity', time: '10:00 - 12:00', details: '關西機場最後購物：免稅店、伴手禮採購、機場美食體驗。' },
        { id: 36, type: 'flight', time: '12:25 - 14:25', details: '搭乘 VZ567 班機從大阪關西國際機場 (KIX) 返回台北 (TPE)。飛行時間約2小時。' },
        { id: 37, type: 'activity', time: '14:25', details: '抵達桃園機場，結束精彩的日本大阪與韓國大邱之旅！' }
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

  // 預設的打包清單項目
  const defaultTodoItems = [
    { id: 'default-1', text: '📄 確認護照效期 (6個月以上)', completed: false, createdAt: new Date().toISOString() },
    { id: 'default-2', text: '📱 下載Google Maps & 乘換案內', completed: false, createdAt: new Date().toISOString() },
    { id: 'default-3', text: '📱 下載Google Translate & Papago', completed: false, createdAt: new Date().toISOString() },
    { id: 'default-4', text: '💰 兌換日幣現金 (小額)', completed: false, createdAt: new Date().toISOString() },
    { id: 'default-5', text: '💰 兌換韓元現金 (大邱快閃用)', completed: false, createdAt: new Date().toISOString() },
    { id: 'default-6', text: '🔌 準備萬用轉接頭 (韓國220V)', completed: false, createdAt: new Date().toISOString() },
    { id: 'default-7', text: '📶 購買eSIM (Airalo/Klook)', completed: false, createdAt: new Date().toISOString() },
    { id: 'default-8', text: '👕 輕便透氣夏季衣物', completed: false, createdAt: new Date().toISOString() },
    { id: 'default-9', text: '☂️ 攜帶摺疊傘 (午後雷雨)', completed: false, createdAt: new Date().toISOString() },
    { id: 'default-10', text: '🧥 薄外套 (室內冷氣)', completed: false, createdAt: new Date().toISOString() },
    { id: 'default-11', text: '💊 個人常用藥品', completed: false, createdAt: new Date().toISOString() },
    { id: 'default-12', text: '🛡️ 購買旅遊保險', completed: false, createdAt: new Date().toISOString() },
    { id: 'default-13', text: '📄 列印航班與住宿確認信', completed: false, createdAt: new Date().toISOString() },
    { id: 'default-14', text: '💳 確認信用卡海外使用', completed: false, createdAt: new Date().toISOString() },
    { id: 'default-15', text: '📱 LINE app (日韓常用)', completed: false, createdAt: new Date().toISOString() }
  ];

  // 初始化數據
  useEffect(() => {
    // 載入待辦清單
    const storedTodos = localStorage.getItem('travelTodoItems');
    if (storedTodos) {
      try {
        setTodoItems(JSON.parse(storedTodos));
      } catch (e) {
        console.error("載入待辦清單時發生錯誤:", e);
        setTodoItems(defaultTodoItems);
      }
    } else {
      // 如果沒有儲存的清單，使用預設清單
      setTodoItems(defaultTodoItems);
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