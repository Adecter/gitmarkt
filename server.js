'use strict'

import express from 'express'
import urlencoded from 'express'
import bodyParser from 'body-parser'
import router from './infrastructure/drivers/router.js'

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded())
app.use(router)
app.use(urlencoded())


const server = app.listen(3000, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
});

