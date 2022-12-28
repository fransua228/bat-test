require('dotenv').config()
const express = require('express')
const app = express()
const { exec } = require('child_process')
const {join} = require('path')
const WebSocket = require('ws')

const port = process.env.PORT;

const execFunction = (err, stdout, stderr) => {
    if (err) return console.error(err);
    console.log(stdout);
}

const ws = new WebSocket(process.env.SERVER_URL);

ws.on('open', function open() {
  ws.send('Connected and work');
});

ws.on('message', function message(data) {
    if(process.env.COMMANDS.includes(String(data))) exec(join(__dirname,"bats",data + ".bat"), execFunction);
  console.log('received: %s', data);
});

app.listen(port, () => console.log(`Work ${port}`))