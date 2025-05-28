import { useRef } from "react";
import { format, isToday } from "date-fns";

interface CalendarCellProps {
  date: Date;
  disabled?: boolean;
  schedules: { title: string }[];
  onAdd: (dateStr: string, title: string) => void;
  onDelete: (dateStr: string, index: number) => void;
}

export default function CalendarCell({
  date,
  schedules,
  disabled = false,
  onAdd,
  onDelete,
}: CalendarCellProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (inputRef.current?.value) {
      onAdd(format(date, "yyyy-MM-dd"), inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "0.5rem",
        backgroundColor: isToday(date)
          ? "#e3f7ff"
          : disabled
          ? "grey"
          : "white",
        minHeight: "100px",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
        }}
      >
        {date.getDate()}
      </div>
      <ul style={{ fontSize: "0.8rem", paddingLeft: "1rem" }}>
        {schedules.map((s, i) => (
          <li key={i}>
            {s.title}
            <button onClick={() => onDelete(format(date, "yyyy-MM-dd"), i)}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
      {!disabled && (
        <>
          <input
            ref={inputRef}
            placeholder="+ 일정"
            style={{ width: "100%" }}
          />
          <button onClick={handleAdd}>추가</button>
        </>
      )}
    </div>
  );
}
