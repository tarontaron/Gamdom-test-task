import type { TEvent } from '~/types/event';

import client from './client';

export default {
  findAll: () => client.get<TEvent[]>('/events'),
};

