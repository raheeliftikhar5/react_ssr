import path from 'path';
import fs from 'fs';
import express from 'express';
import cookieParser from 'cookie-parser';

import React from 'react';
import ReactDomServer from 'react-dom/server';
import App from '../src/App';

const PORT = 3000;
const app = express();

app.use(cookieParser());

app.get('^/$', (req, resp) => {
  let accessLevel = 'public';
  const indexFile = path.resolve('./build/index.html');
  
  const sidCookie = req.cookies.sid;
  if (sidCookie === 'test-session-id') {
    accessLevel = 'admin';
  } else if (sidCookie === 'banned-user') {
    accessLevel = 'banned';
  }
  console.log(accessLevel, req.path);

  const app = ReactDomServer.renderToString(
    <App name={accessLevel}/>
  );

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      return resp.status(500).send('Something went wrong');
    }

    const cookieScript = `<script id="sid-cookie">window.__INITIAL__DATA__ = ${JSON.stringify(accessLevel)}</script>`;

    data = data.replace('<script id="sid-cookie"></script>', cookieScript);
    data = data.replace('<div id="root"></div>', `<div id="root">${app}</div>`);
    if (accessLevel === 'banned') {
      return resp.status(401).send(data);
    }
    return resp.send(data);
  })
})

app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
})
