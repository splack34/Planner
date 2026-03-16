import React, { useMemo, useState } from "react";

type PlannerEntry = {
  date: string; // YYYY-MM-DD
  note: string;
};

type PlannerMap = Record<string, PlannerEntry>;

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function toISODate(year: number, monthIndex: number, day: number) {
  const m = String(monthIndex + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function formatHuman(dateIso: string) {
  const d = new Date(dateIso);
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export const CalendarPlanner: React.FC = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(
    toISODate(today.getFullYear(), today.getMonth(), today.getDate())
  );
  const [planner, setPlanner] = useState<PlannerMap>({});
  const [quickNote, setQuickNote] = useState("");

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const handleAddQuickNote = () => {
    if (!quickNote.trim()) return;
    setPlanner((prev) => ({
      ...prev,
      [selectedDate]: {
        date: selectedDate,
        note: prev[selectedDate]?.note
          ? prev[selectedDate].note + "\n- " + quickNote.trim()
          : "- " + quickNote.trim(),
      },
    }));
    setQuickNote("");
  };

  const handleNoteChange = (dateIso: string, value: string) => {
    setPlanner((prev) => ({
      ...prev,
      [dateIso]: { date: dateIso, note: value },
    }));
  };

  const currentMonthName = new Date(currentYear, currentMonth, 1).toLocaleString(
    "default",
    { month: "long" }
  );

  // Build mini calendar cells
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarCells.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarCells.push(day);

  const todayIso = toISODate(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // Build planner list (agenda-style)
  const plannerList = useMemo(() => {
    const entries = Object.values(planner);
    if (!entries.length) return [];

    // sort by date ascending
    return entries.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  }, [planner]);

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        padding: 16,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 16,
          gap: 8,
        }}
      >
        <div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>Planner</div>
          <div style={{ fontSize: 14, color: "#6b7280" }}>
            Focus on your tasks. Calendar is just a helper on the side.
          </div>
        </div>
        <div style={{ fontSize: 13, color: "#6b7280" }}>
          Today:{" "}
          {today.toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr minmax(260px, 1fr)",
          gap: 16,
        }}
      >
        {/* LEFT: Planner panel */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: 12,
            backgroundColor: "#f9fafb",
          }}
        >
          {/* Selected day + quick add */}
          <div
            style={{
              marginBottom: 12,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Plan for {formatHuman(selectedDate)}</span>
              {selectedDate === todayIso && (
                <span
                  style={{
                    fontSize: 11,
                    padding: "2px 8px",
                    borderRadius: 999,
                    backgroundColor: "#dbeafe",
                    color: "#1d4ed8",
                  }}
                >
                  Today
                </span>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
              }}
            >
              <input
                value={quickNote}
                onChange={(e) => setQuickNote(e.target.value)}
                placeholder="Quick add task or note..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddQuickNote();
                  }
                }}
                style={{
                  flex: 1,
                  padding: "6px 8px",
                  borderRadius: 6,
                  border: "1px solid #d1d5db",
                  fontSize: 14,
                }}
              />
              <button
                onClick={handleAddQuickNote}
                style={{
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "none",
                  backgroundColor: "#2563eb",
                  color: "white",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Add
              </button>
            </div>

            <textarea
              value={planner[selectedDate]?.note ?? ""}
              onChange={(e) => handleNoteChange(selectedDate, e.target.value)}
              placeholder="Details or longer notes for this day..."
              style={{
                width: "100%",
                minHeight: 90,
                padding: 8,
                borderRadius: 6,
                border: "1px solid #d1d5db",
                resize: "vertical",
                fontFamily: "inherit",
                fontSize: 14,
                backgroundColor: "white",
              }}
            />
          </div>

          {/* Agenda list for all days with notes */}
          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              paddingTop: 10,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 6,
                color: "#4b5563",
              }}
            >
              Upcoming & past notes
            </div>
            {plannerList.length === 0 && (
              <div style={{ fontSize: 13, color: "#9ca3af" }}>
                No days planned yet. Start by adding a note above.
              </div>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                maxHeight: 260,
                overflowY: "auto",
              }}
            >
              {plannerList.map((entry) => (
                <button
                  key={entry.date}
                  onClick={() => setSelectedDate(entry.date)}
                  style={{
                    textAlign: "left",
                    padding: 8,
                    borderRadius: 8,
                    border:
                      entry.date === selectedDate
                        ? "2px solid #2563eb"
                        : "1px solid #e5e7eb",
                    backgroundColor:
                      entry.date === selectedDate ? "#eff6ff" : "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 4,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{formatHuman(entry.date)}</span>
                    {entry.date === todayIso && (
                      <span
                        style={{
                          fontSize: 11,
                          color: "#16a34a",
                        }}
                      >
                        Today
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#4b5563",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {entry.note}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: mini calendar helper */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: 12,
            backgroundColor: "#ffffff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <button
              onClick={handlePrevMonth}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: 4,
              }}
            >
              {"<"}
            </button>
            <div style={{ fontSize: 14, fontWeight: 600 }}>
              {currentMonthName} {currentYear}
            </div>
            <button
              onClick={handleNextMonth}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: 4,
              }}
            >
              {">"}
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 4,
              fontSize: 11,
            }}
          >
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                  padding: "2px 0",
                  color: "#6b7280",
                }}
              >
                {day}
              </div>
            ))}

            {calendarCells.map((day, index) => {
              if (day === null) return <div key={index} />;

              const iso = toISODate(currentYear, currentMonth, day);
              const isToday = iso === todayIso;
              const isSelected = iso === selectedDate;
              const hasNote = !!planner[iso]?.note;

              return (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedDate(iso);
                  }}
                  style={{
                    border: isSelected ? "2px solid #2563eb" : "1px solid #e5e7eb",
                    backgroundColor: isToday
                      ? "#dbeafe"
                      : hasNote
                      ? "#ecfdf5"
                      : "#ffffff",
                    color: "#111827",
                    borderRadius: 6,
                    minHeight: 28,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 2,
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: 12 }}>{day}</span>
                  {hasNote && (
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "999px",
                        backgroundColor: "#16a34a",
                        marginTop: 2,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};