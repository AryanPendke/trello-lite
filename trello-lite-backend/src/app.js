const express = require('express');

const {morganMiddleware} = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const healthRoutes = require('./routes/healthRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const boardRoutes = require('./routes/boardRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morganMiddleware);

app.use('/api/health',healthRoutes);
app.use('/api/users',userRoutes);
app.use('/api/tasks',taskRoutes);
app.use('/api/boards',boardRoutes);

app.use(
    (req,res,next) => {
        res.status(404).json({success: false, message: 'Not Found'});
    }
);

app.use(errorHandler);

module.exports = app;