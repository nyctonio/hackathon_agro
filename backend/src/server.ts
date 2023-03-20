import express from 'express';
import { env } from '../constants';

const app = express();
const PORT = env.PORT;

app.use(express.json());
app.use('/', require('./routes/index'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
