const express = require('express');
const router = express.Router();
const {country} = require('../models/country')


router.get('/adios',async (request, response) => {
   try{
    const currencies = await country.findAll();
    response.json(currencies); 
   }
   catch (error){
    response.status(500).json({error: 'resource not found'})
   }
});  


router.post('/api/currency', async (request, response) => {
  try {
  const   { currencyCode, country, conversionRate } = request.body;
  if (!currencyCode || !country || !conversionRate) {
    return response.status(400).json({ error: 'content missing' });
  }
  const postCurrency = await country.create({
    id, 
    currencyCode, 
    country, 
    conversionRate });
    return response.json(postCurrency);
}
  catch(error){
    return response.status(201).json(error);
  }
});


router.delete('/api/currency/:id', async (request, response) => {
  try{
  const deleteId = parseInt(request.params.id);
  const index = await country.destroy ({where: (deleteId)});
    if (index !== -1) throw new Error(index);
    response.sendStatus(204).json;
  } catch (error) {
    response.status(404).json({error: 'resource not found' });
  }
});

module.exports = router;
