// Imports
const path = require('path');
const axios = require('axios');
const express = require('express');
const { API_ROUTE, API_KEY } = require('./config');
const morgan = require('morgan');

// Express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', '..', 'dist')));
app.use(morgan('dev'));

// API proxy
app.all('/api/*', async (req, res, next) => {
  try {
    const config = {
      url: `${API_ROUTE}${req.url.slice(5, req.url.length)}`,
      method: `${req.method}`,
      data: req.body,
      headers: {
        Authorization: API_KEY
      }
    };
    const { data } = await axios(config);
    res.json(data);
    res.end();
    next();
  } catch (error) {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error'
      }
    });
  }
});

// For react router
app.get('*', function (req, res) {
  res.sendFile('index.html', {
    root: path.join(__dirname, '../../dist')
  });
});

// Port
app.listen(3000, () => {
  console.log('Express server is listening on 3000');
});
