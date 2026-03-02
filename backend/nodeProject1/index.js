// server.mjs
import { read, readFile, writeFile } from 'node:fs';
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

writeFile('hello.txt', 'Hello World!', (err) => {
   if(err) throw err;
    console.log('File created successfully');
});

readFile('hello.txt', 'utf8', (err, data) => {
   if(err) throw err;
    console.log('File content:', data);
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`