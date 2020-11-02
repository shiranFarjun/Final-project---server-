const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// const DB = process.env.DATABASE.replace(
//     '<PASSWORD>',
//     process.env.DATABASE_PASSWORD
// );

mongoose.connect('mongodb://127.0.0.1:27017/appIDo', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB connection successful'));

const port=process.env.PORT ||3007;

app.listen(port, () => {
    console.log(`App runing on port ${port}...`);
});