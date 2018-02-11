const express = require('express');
const app = express();
const generalRoutes = require('./Routes/generalRoutes.js')
const userRoutes = require('./Routes/userRoutes.js')

app.use(express.static('./clientSide/kickStarter/dist'))
app.use('/api/general',generalRoutes);
app.use('/api/user',userRoutes);

app.listen(8080, () => console.log('server runing'));
