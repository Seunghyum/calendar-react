import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
  startOfWeek,
  subDays,
  addDays,
  endOfWeek,
} from "date-fns";
import CalendarCell from "./CalendarCell";

interface CalendarGridProps {
  currentDate: Date;
  schedules: { [key: string]: { title: string }[] };
  onAddSchedule: (dateStr: string, title: string) => void;
  onDeleteSchedule: (dateStr: string, index: number) => void;
}

export default function CalendarGrid({
  currentDate,
  schedules,
  onAddSchedule,
  onDeleteSchedule,
}: CalendarGridProps) {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  const prevStartDate = startOfWeek(subDays(start, 1));
  const prevEndDays = endOfMonth(subDays(prevStartDate, 1));
  let prevDays: Date[] = [];
  if (getDay(start) !== 0) {
    prevDays = eachDayOfInterval({
      start: prevStartDate,
      end: prevEndDays,
    });
  }

  const afterStartDate = addDays(end, 1);
  let afterDays: Date[] = [];
  if (getDay(end) !== 6) {
    const afterEndDays = endOfWeek(afterStartDate);
    afterDays = eachDayOfInterval({
      start: afterStartDate,
      end: afterEndDays,
    });
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "0.5rem",
      }}
    >
      {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
        <div key={day} style={{ textAlign: "center" }}>
          <strong>{day}</strong>
        </div>
      ))}
      {prevDays.map((date) => (
        <CalendarCell
          key={date.toDateString()}
          disabled
          date={date}
          schedules={schedules[format(date, "yyyy-MM-dd")] || []}
          onAdd={onAddSchedule}
          onDelete={onDeleteSchedule}
        />
      ))}
      {days.map((date) => (
        <CalendarCell
          key={date.toDateString()}
          date={date}
          schedules={schedules[format(date, "yyyy-MM-dd")] || []}
          onAdd={onAddSchedule}
          onDelete={onDeleteSchedule}
        />
      ))}
      {afterDays.map((date) => (
        <CalendarCell
          key={date.toDateString()}
          date={date}
          disabled
          schedules={schedules[format(date, "yyyy-MM-dd")] || []}
          onAdd={onAddSchedule}
          onDelete={onDeleteSchedule}
        />
      ))}
    </div>
  );
}
