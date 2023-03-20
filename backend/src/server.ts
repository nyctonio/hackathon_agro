import express from 'express';
import { env } from '../constants';
import cors from 'cors';
const app = express();
const PORT = env.PORT;

app.use(express.json());
app.set('view engine', 'ejs');
app.use(
  cors({
    origin: '*',
  })
);
app.use('/', require('./routes/index'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
