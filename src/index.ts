import express from 'express';
import sequelize from './sequelize-connection';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({})
  }
  next();
});



app.use('/movies', require('./routes/movies').router);



app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});

sequelize.sync().then();