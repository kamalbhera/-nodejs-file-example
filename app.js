var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs')
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
const port = 3000
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const jsonsInDir = fs.readdirSync('./directassurance').filter(file => path.extname(file) === '.json');

app.get('/', (req, res) => {
  let count = 0;
  jsonsInDir.forEach(file => {
    const fileData = fs.readFileSync(path.join('./directassurance', file));
    const currentArticle = JSON.parse(fileData.toString());
    // count += 1
    // console.log(count, currentArticle.type);
    if (currentArticle.type == 'landing') {
      // fs.readFile("./template/index.json", "utf8", (err, jsonString) => {
      //   if (err) {
      //     console.log("File read failed:", err);
      //     return;
      //   }
      // });
      count += 1
      console.log(count, file, currentArticle.type);
      //fs.writeFileSync(`./blog_article/${file}`, JSON.stringify(currentArticle));
    }
  });

  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Node app listening on port ${port}`)
})

module.exports = app;

//chett.thapa@tataaig.com