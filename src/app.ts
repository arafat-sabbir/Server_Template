import express, { Request, Response } from 'express';
const app = express();
import cors from 'cors';
import allRoutes from './app/routes';
//middlewares

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
// use All The Routes From Routes
app.use('/api/v1', allRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
