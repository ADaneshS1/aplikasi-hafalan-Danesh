const express = require('express');
const app = express();

const port = 3001;

const server = app.listen(port, () => {
    console.log("Halo cuyy, Server sudah jalan di http://localhost:" + port)
});

module.exports = server;