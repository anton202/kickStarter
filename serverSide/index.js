const express = require('express');
const app = express();
const generalRoutes = require('./routes/generalRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

app.use(express.static('./client/dist'))
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 60 * 1000
  }
}));

app.use(bodyParser({
  limit: '50mb'
}));

app.use('/api/general', generalRoutes);
app.use('/api/user', userRoutes);

app.get('*', (req, res) => {
  return res.sendFile(path.join('/home/anton/dev/kickStarter/serverSide/client/dist', '/index.html')); // /home/anton/dev/kickStarter/serverSide
});

app.listen(8080, () => console.log('server runing'));
