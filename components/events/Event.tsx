import { EventTypes } from "@/types/event-types";
import Calendar from "../svg/Calendar";
import { formatDate } from "@/utils/formatDate";

function Event(props: EventTypes) {
  return (
    <div className="event p-2 py-3 flex  flex-col gap-1">
      <div className="w-full flex flex-col gap-1 truncate">
        <span className="event-title truncate font-medium">{props.title}</span>
        <span className="date flex opacity-50 gap-2 items-center">
          <Calendar />
          <span className="date-text number">
            {formatDate(props.fromDate)} - {formatDate(props.toDate)}
          </span>
        </span>
      </div>
    </div>
  );
}

export default Event;
