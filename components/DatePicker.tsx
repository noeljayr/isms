/* DatePicker.tsx */
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface DatePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  minDate,
  maxDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const swiperRef = useRef<any>(null);

  const startOfMonth = (month: Date) =>
    new Date(month.getFullYear(), month.getMonth(), 1);
  const endOfMonth = (month: Date) =>
    new Date(month.getFullYear(), month.getMonth() + 1, 0);

  const generateDays = (month: Date) => {
    const days = [];
    const startDay = startOfMonth(month).getDay();
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= endOfMonth(month).getDate(); i++) {
      days.push(new Date(month.getFullYear(), month.getMonth(), i));
    }
    return days;
  };

  const isSelectable = (date: Date) => {
    if (minDate && date < minDate) return false;
    if (maxDate && date > maxDate) return false;
    return true;
  };

  const handleSlideChange = (swiper: any) => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + (swiper.activeIndex - 1),
      1
    );
    setCurrentMonth(newMonth);
  };

  const previousMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() - 1,
    1
  );
  const nextMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    1
  );

  const months = [previousMonth, currentMonth, nextMonth];

  return (
    <div className="date-picker">
      {label && <label className="date-picker__label">{label}</label>}
      <div className="calendar-navigation">
        <button onClick={() => swiperRef.current?.slidePrev()}>{"<"}</button>
        <button onClick={() => swiperRef.current?.slideNext()}>{">"}</button>
      </div>
      <Swiper
        initialSlide={1}
        onSlideChange={handleSlideChange}
        spaceBetween={50}
        slidesPerView={1}
        modules={[Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {months.map((month, index) => (
          <SwiperSlide key={index}>
            <div className="calendar">
              <div className="calendar-header">
                <span>
                  {month.toLocaleString("default", { month: "long" })}{" "}
                  {month.getFullYear()}
                </span>
              </div>
              <div className="calendar-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div key={day} className="calendar-day-header">
                      {day}
                    </div>
                  )
                )}
                {generateDays(month).map((day, idx) => (
                  <div
                    key={idx}
                    className={`calendar-day ${
                      day && isSelectable(day) ? "selectable" : "disabled"
                    } ${
                      value &&
                      day &&
                      day.toDateString() === value.toDateString()
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => day && isSelectable(day) && onChange(day)}
                  >
                    {day ? day.getDate() : ""}
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DatePicker;
