import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/users.routes';
import eventsRoutes from './routes/events.routes';

import errorHandlerMiddleware from './middlewares/errorHandler.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/events', eventsRoutes);

app.use(errorHandlerMiddleware);


export default app;
