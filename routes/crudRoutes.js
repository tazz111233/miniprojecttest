const express = require('express');
const router = express.Router();
// const { currencies } = require('../currencies/data'); 
const {currency} = require('../models/currency');


router.get('/adios',async (request, response) => {
   try{
    const currencies = await currency.findAll();
    response.json(currencies); 
   }
   catch (error){
    response.status(500).json({error: 'resource not found'})
   }
});  

// router.get('/api/currency/', (request, response) => {
//   response.json(currencies);
// });

router.get('/api/currency/:id', async (request, response) => {
  try{
  const getId = parseInt(request.params.id);
  const result = await currency.findAll(getId);
  if (!result) throw new Error('resource not found')
  response.json(result)
  }
  catch (error) {
    return response.status(404).json({ error: 'resource not found' });
  }
});

router.post('/api/currency', async (request, response) => {
  try {
  const   { currencyCode, country, conversionRate } = request.body;
  if (!currencyCode || !country || !conversionRate) {
    return response.status(400).json({ error: 'content missing' });
  }
  const postCurrency = await currency.create({
    id, 
    currencyCode, 
    country, 
    conversionRate });
    return response.json(postCurrency); 
    console.log('New Currency Created:', postCurrency);
}
  catch(error){
    return response.status(201).json(error);
  }
});

router.put('/api/currency/:id/:newRate', async (request, response) => {
  try{
  const putId = parseInt(request.params.id);
  const newRate = parseFloat(request.params.newRate);
  const result2 = await currency.findByPk(putId);
  if (!result2) throw new Error('resource not found');
  result2.conversionRate = newRate;
  response.json(result2);            
  } catch (error){ 
    return response.status(404).json({error:'resource not found' })
  }  
});

router.delete('/api/currency/:id', async (request, response) => {
  try{
  const deleteId = parseInt(request.params.id);
  const index = await currency.destroy ({where: (deleteId)});
    if (index !== -1) throw new Error(index);
    response.sendStatus(204).json;
  } catch (error) {
    response.status(404).json({error: 'resource not found' });
  }
});

module.exports = router;
