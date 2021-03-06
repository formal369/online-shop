const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const { auth } = require("./middleware/auth");
const { User } = require('./models/User');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());



app.use('/api/users', require('./routes/user'));
app.use('/api/product', require('./routes/product'));

// client에서  back서버에 있는 static한 파일들을 (이미지, css 파일, javascript 파일) 처리하기 위한 코드
app.use("/uploads", express.static("uploads"))

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!!!'));

app.get('/api/hello', (req, res) => {
    res.send('안녕~')
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));

