import express from 'express';
import cors from 'cors';
import apiRoutes from './api';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
