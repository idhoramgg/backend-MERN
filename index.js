const express = require('express')
const cors = require('cors')

const db = require('./config/database')
const {
  PORT
} = require('./config/envir')
const bodyParser = require('body-parser')
const app = express()

const port = PORT || 4000

const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user')
const profileRouter = require('./routes/profile')
const commentRouter = require('./routes/comment');

app.use(cors())
app.use(bodyParser.json({
  Type: '*/*'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));


db.then(() => {
    console.log(`connected to database`);
  })
  .catch(error => {
    console.log('error')
  })

app.get('/', (req, res) => res.send(`welcome`))
app.use('/', userRouter);
app.use('/', blogRouter);
app.use('/', profileRouter);
app.use('/', commentRouter);

app.listen(port, () => {
  console.log(`sukses berjalan di port ${port}`)
});