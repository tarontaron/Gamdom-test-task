import pool from '../services/db';
import type { TCreateEventPayload, TUpdateEventPayload } from '../types/event.types';

export interface IEvent {
  event_id: number;
  event_name: string;
  odds: string; //

  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export const EventModel = {
  findAll: async (): Promise<IEvent[]> => {
    const { rows } = await pool.query<IEvent>('SELECT * FROM events WHERE deleted_at IS NULL');

    return rows;
  },
  findById: async (id: number): Promise<IEvent | null> => {
    const { rows } = await pool.query<IEvent>('SELECT * FROM events WHERE event_id = $1 AND deleted_at IS NULL', [id]);

    return rows[0] || null;
  },
  existsById: async (id: number): Promise<boolean> => {
    const { rows } = await pool.query<{ exists: boolean }>('SELECT EXISTS(SELECT 1 FROM events WHERE event_id = $1 AND deleted_at IS NULL) AS exists', [id]);

    return rows[0].exists;
  },
  create: async (payload: TCreateEventPayload) => {
    const { name, odds } = payload;

    const { rows } = await pool.query<IEvent>(`
        INSERT INTO events (event_name, odds)
        VALUES ($1, $2)
        RETURNING *
    `, [name, odds]);

    return rows[0];
  },
  updateById: async (id: number, payload: TUpdateEventPayload): Promise<IEvent> => {
    const { name, odds } = payload;

    const { rows } = await pool.query<IEvent>(`
        UPDATE events
        SET event_name = COALESCE($1, event_name),
            odds       = COALESCE($2, odds),
            updated_at = NOW()
        WHERE event_id = $3
          AND deleted_at IS NULL
        RETURNING *
    `, [name, odds, id]);

    return rows[0];
  },
  deleteById: async (id: number): Promise<boolean> => {
    const { rowCount } = await pool.query<IEvent>(`
        UPDATE events
        SET deleted_at = NOW()
        WHERE event_id = $1
          AND deleted_at IS NULL
    `, [id]);

    return !!rowCount;
  }
};
