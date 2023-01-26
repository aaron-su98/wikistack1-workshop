const express = require("express");
const app = express();
const PORT = 3000;
const layout = require("./views/layout.js");
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');
const { db, Page, User } = require('./models');


app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send(layout(""))
});


db.authenticate() 
  .then(() => { 
    console.log('connected to the database'); 
});

const init = async () => {
    await db.sync({force: true});
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}!`)
    })
  }
  
  init();