"use client";

import "@/css/events.css";
import { events } from "@/data/events";
import Event from "./Event";
import { useEffect, useRef, useState } from "react";

function Events() {
  const [timelineHieght, setTimelineHeight] = useState(0);
  const eventlistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eventlistRef.current) {
      const height = eventlistRef.current.offsetHeight;
      setTimelineHeight(height);
    }
  });

  return (
    <div className="events card">
      <div className="card-title">This term's key events</div>
      <div className="card-body h-full w-full">
        <div
          ref={eventlistRef}
          className="event-list w-full grid gap-2 relative"
        >
          <span
            style={{ height: timelineHieght }}
            className="timeline absolute left-0.5"
          ></span>
          {events.map((event, index) => (
            <Event
              title={event.title}
              fromDate={event.fromDate}
              toDate={event.toDate}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
