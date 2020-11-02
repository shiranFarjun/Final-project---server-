const express = require('express');
const morgan = require('morgan');
const cors = require("cors") 
const userRouter = require('./src/routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// 3) ROUTES
app.use('/api/v1/users',userRouter);          //app.use('api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    })
})

module.exports = app;