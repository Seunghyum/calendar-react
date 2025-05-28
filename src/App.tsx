import { useState } from "react";
import CalendarGrid from "./components/CalendarGrid";
import { addMonths, getMonth, startOfMonth, subMonths } from "date-fns";

function App() {
  const [currentDate, setCurrentDate] = useState(startOfMonth(new Date()));
  const [schedules, setSchedules] = useState<{
    [key: string]: { title: string }[];
  }>({});

  const addSchedule = (dateStr: string, title: string) => {
    setSchedules((prev) => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), { title }],
    }));
  };

  const deleteSchedule = (dateStr: string, index: number) => {
    setSchedules((prev) => {
      const newList = [...(prev[dateStr] || [])];
      newList.splice(index, 1);
      return { ...prev, [dateStr]: newList };
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const handleToday = () => {
    setCurrentDate(startOfMonth(new Date()));
  };
  return (
    <>
      <div className="flex justify-between">
        <button onClick={handlePrevMonth}>이전 달</button>
        <button onClick={handleToday}>오늘</button>
        <button onClick={handleNextMonth}>다음 달</button>
      </div>
      <div style={{ padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>📅 일정 관리</h2>
          <h2>{getMonth(currentDate) + 1}월</h2>
        </div>
        <CalendarGrid
          currentDate={currentDate}
          schedules={schedules}
          onAddSchedule={addSchedule}
          onDeleteSchedule={deleteSchedule}
        />
      </div>
    </>
  );
}

export default App;
