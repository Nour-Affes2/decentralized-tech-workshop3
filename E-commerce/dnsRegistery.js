const express = require('express')
const app = express()
const PORT = 4000
const SERVER_URL = "http://localhost:3001";

app.get('/getServer', (req, res) => {
    res.json({code: 200, server: SERVER_URL})
});

app.listen(PORT, () => {
    console.log(`DNS Registry running on http://localhost:${PORT}`)
});

