const express = require('express');
const app = express();
const generalRoutes = require('./Routes/generalRoutes.js')
const userRoutes = require('./Routes/userRoutes.js')
const path = require('path');

app.use(express.static('./clientSide/kickStarter/dist'))
app.use('/api/general',generalRoutes);
app.use('/api/user',userRoutes);
app.get('*', (req, res) => {
    return res.sendFile(path.join('/home/anton/dev/kickStarter/serverSide/clientSide/kickStarter/dist', '/index.html'));
});

app.listen(8080, () => console.log('server runing'));
