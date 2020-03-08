'use strict'

import express from 'express'
import router from './drivers/router.js'


const app = express()

app.use(express.static('public'))
app.use(router)



const server = app.listen(3000, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
});

