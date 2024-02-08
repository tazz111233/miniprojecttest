const express = require('express');
const router = express.Router();
const { currencies } = require('../currencies/data'); 

router.get('/adios', (request, response) => {
  response.send('Hello World!');
});  

router.get('/api/currency/', (request, response) => {
  response.json(currencies);
});

router.get('/api/currency/:id', (request, response) => {
  const getId = parseInt(request.params.id);
  const result = currencies.find((call) => call.id === getId);
  if (!result) {
    return response.status(404).json({ error: 'resource not found' });
  }
  response.json(result);
});

router.post('/api/currency', (request, response) => {
  const { currencyCode, country, conversionRate } = request.body;
  if (!currencyCode || !country || !conversionRate) {
    return response.status(400).json({ error: 'content missing' });
  }
  const postCurrency = { id: currencies.length + 1, currencyCode, country, conversionRate };
  currencies.push(postCurrency);
  console.log('New Currency Created:', postCurrency);
  response.status(201).json(postCurrency);
});

router.put('/api/currency/:id/:newRate', (request, response) => {
  const putId = parseInt(request.params.id);
  const newRate = parseFloat(request.params.newRate);
  const result2 = currencies.find((c) => c.id === putId);
  if (!result2) {
    return response.status(404).json({ error: 'resource not found' });
  }
  result2.conversionRate = newRate;
  response.json(result2);
});

router.delete('/api/currency/:id', (request, response) => {
  const deleteId = parseInt(request.params.id);
  const index = currencies.findIndex((del) => del.id === deleteId);
  if (index !== -1) {
    currencies.splice(index, 1);
    response.sendStatus(204);
  } else {
    response.status(404).json({ error: 'resource not found' });
  }
});

module.exports = router;
