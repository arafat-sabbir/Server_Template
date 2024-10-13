import express, { Request, Response } from 'express';
const app = express();
import cors from 'cors';

//middlewares

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
