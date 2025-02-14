import type { TEvent } from '~/types/event';
import { EventCard } from '~/components/cards';

type TProps = {
  events?: TEvent[];
};

const EventsList = ({ events }: TProps) => {
  return (
    <div className="bg-neutral-800/50 py-8 px-4 rounded-sm flex flex-col gap-4">
      {events?.length ?
        events.map(event => (
          <EventCard key={event.event_id} data={event} />
        ))
        : <p className="text-stone-50">No events found</p>}
    </div>
  );
};

export default EventsList;
