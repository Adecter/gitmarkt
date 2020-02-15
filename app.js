'use strict'

import express from 'express'
import urlencoded from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded())

app.use(urlencoded())

app.post('/register', (req, res) => {
    const { name, type, logo, keywords } = req.body;

    res.json({ name, type, logo, keywords })
})

const server = app.listen(3000, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
});

