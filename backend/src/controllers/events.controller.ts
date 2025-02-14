import { NextFunction, Request, Response } from 'express';
import { EventModel, IEvent } from '../models/event.model';
import NotFoundError from '../errors/notFoundError';
import type { TCreateEventPayload, TUpdateEventPayload } from '../types/event.types';

export default {
  findAll: async (_: Request, res: Response<IEvent[]>, next: NextFunction) => {
    try {
      const events = await EventModel.findAll();

      res.json(events);
    } catch (e) {
      next(e);
    }
  },
  findById: async (req: Request<{ id: string }>, res: Response<IEvent>, next: NextFunction) => {
    try {
      const { id } = req.params;
      const event = await EventModel.findById(+id);

      if (!event) {
        next(new NotFoundError(`Event with id ${id} not found.`));
        return;
      }

      res.json(event);
    } catch (e) {
      next(e);
    }
  },
  create: async (req: Request<{}, {}, TCreateEventPayload>, res: Response<IEvent>, next: NextFunction) => {
    try {
      const { name, odds } = req.body;

      const event = await EventModel.create({ name, odds });

      res.status(201).json(event);
    } catch (e) {
      next(e);
    }
  },
  updateById: async (req: Request<{ id: string }, {}, TUpdateEventPayload>, res: Response<IEvent>, next: NextFunction) => {
    try {
      const { id } = req.params;

      const existsEvent = await EventModel.existsById(+id);
      if (!existsEvent) {
        next(new NotFoundError(`Event with id ${id} not found.`));
        return;
      }

      const { name, odds } = req.body;
      const event = await EventModel.updateById(+id, { name, odds });

      res.status(200).json(event);
    } catch (e) {
      next(e);
    }
  },
  deleteById: async (req: Request<{ id: string }>, res: Response<boolean>, next: NextFunction) => {
    try {
      const { id } = req.params;

      const existsEvent = await EventModel.existsById(+id);
      if (!existsEvent) {
        next(new NotFoundError(`Event with id ${id} not found.`));
        return;
      }

      await EventModel.deleteById(+id);

      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
};
