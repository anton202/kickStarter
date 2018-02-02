const express = require('express');
const app = express();
const route = require('./router.js')

app.use(express.static('./clientSide/kickStarter/dist'))
app.use('/',route);

app.listen(8080, () => console.log('server runing'));
