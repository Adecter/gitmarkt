'use strict'

import express from 'express'
import router from './drivers/router.js'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static('public'))
app.use(router)

const server = app.listen(3000, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
});

