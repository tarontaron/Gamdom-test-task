import { memo } from 'react';
import type { TEvent } from '~/types/event';
import { useBooleanState } from '~/hooks';
import { BetPopup } from '~/components/popups';
import { Button, OddBadge } from '~/components/ui';

type TProps = {
  data: TEvent;
};

const EventCard = memo(({ data }: TProps) => {
  const { event_name, odds } = data;

  const { isActive, activate, deactivate } = useBooleanState();

  return (
    <div className="flex align-center justify-between gap-2 bg-neutral-800/20 py-2 px-4 rounded-sm">
      <p className="text-slate-300">{event_name}</p>
      <div className="flex flex-col items-end gap-2">
        <OddBadge value={odds} />
        <Button onClick={activate}>Place bet</Button>
      </div>
      {isActive && <BetPopup odds={odds} onClose={deactivate} />}
    </div>
  );
});

export default EventCard;
