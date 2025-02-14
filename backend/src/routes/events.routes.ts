import { Router } from 'express';

import eventsController from '../controllers/events.controller';
import authenticateMiddleware from '../middlewares/authenticate.middleware';
import validateParamsMiddleware from '../middlewares/validateParams.middleware';
import validateBodyMiddleware from '../middlewares/validateBody.middleware';

import idValidator from '../validators/id.validator';
import createEventValidator from '../validators/createEvent.validator';
import updateEventValidator from '../validators/updateEvent.validator';

const router = Router();

router.get('/', authenticateMiddleware, eventsController.findAll);
router.get('/:id', authenticateMiddleware, validateParamsMiddleware(idValidator), eventsController.findById);
router.post('/', authenticateMiddleware, validateBodyMiddleware(createEventValidator), eventsController.create);
// here used patch instead of put to have a partial update
router.patch(
  '/:id',
  authenticateMiddleware,
  validateParamsMiddleware(idValidator),
  validateBodyMiddleware(updateEventValidator),
  eventsController.updateById,
);
router.delete('/:id', authenticateMiddleware, validateParamsMiddleware(idValidator), eventsController.deleteById);

export default router;
