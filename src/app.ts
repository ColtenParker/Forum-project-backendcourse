import express from 'express';
import usersRouter from './routes/users.js';
import logging from './middleware/logging.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use(logging.logRequest);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`App listening http://localhost:${port}.`);
});