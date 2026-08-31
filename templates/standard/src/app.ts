import express from 'express';
import router from './router.js';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

app.use((_req, res) => {
  res.status(404).json({ success: false, error: { message: 'Not found' } });
});

export default app;
