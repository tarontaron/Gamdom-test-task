import { useEventsQuery } from '~/queries/event/useEventsQuery';
import { EventsList } from '~/components/widgets';
import { Spinner } from '~/components/ui';

const Home = () => {
  const { data, isLoading } = useEventsQuery();

  return (
    <div>
      {!isLoading ? <EventsList events={data} /> : <Spinner />}
    </div>
  );
};

export default Home;
