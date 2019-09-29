const express = require('express')
const cors = require('cors')

const db = require('./config/database')
const {PORT} = require('./config/envir')
const bodyParser = require('body-parser')
const app = express()
const port = PORT || 3000

const accountRouter = require('./routes/account')
const blogRouter = require('./routes/blog');

app.use(cors())
app.use(bodyParser.json( {Type: '*/*'}));
app.use(bodyParser.urlencoded({
  extended:true
}));


db.then(()=> {
  console.log(`connected to database`);
})
.catch(error => {
  console.log('error')
})

app.get('/', (req, res)=> res.send(`welcome`))
app.use('/', accountRouter);
app.use('/', blogRouter)

app.listen(port, () => {
  console.log(`sukses berjalan di port ${port}`)
});