const express = require('express');
const router = express.Router();
// const { currencies } = require('../currencies/data'); 
const currency = require('../models/currency');


// router.get('/',async (request, response) => {
//    try{
//     const currencies = await currency.findAll();
//     response.json(currencies); 
//    }
//    catch (error){
//     response.status(500).json({error: 'resource not found'})
//    }
//   // response.status(201).json('routes success')
// });  
router.get('/', async(request, response) => {
  try {
      const currencies = await currency.findAll();
      response.json(currencies);
  } catch (error) {
      response.status(500).json({ error: error.message });
  }
})

// router.get('/api/currency/', (request, response) => {
//   response.json(currencies);
// }); 

router.get('/:id', async (request, response) => {
  try{
  const getId = parseInt(request.params.id);
  const result = await currency.findByPk(getId);
  if (!result) throw new Error('resource not found')
  response.json(result)
  }
  catch (error) {
    return response.status(404).json({ error: 'resource not found' });
  }
});

router.post('/', async (request, response) => {
  try {
  const   { currencyCode, countryId, conversioRate } = request.body;
  if (!currencyCode || !countryId || !conversioRate) {
    return response.status(400).json({ error: 'content missing' });
  }

  //const jane = await User.create({ firstName: "Jane", lastName: "Doe" });
  const postCurrency = await currency.create({
    currencyCode,       
    countryId, 
    conversioRate});
    response.status(201).json(postCurrency); 
    console.log('New Currency Created:', postCurrency);
}
  catch(error){
    return response.status(201).json(error);
  }
// response.status(201).json('post request')
});

router.put('/:id/:newRate', async (request, response) => {
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

router.delete('/:id', async (request, response) => {
  try{
  const deleteId = parseInt(request.params.id);
  const index = await currency.destroy ({where: {id:deleteId}});
    if (index !== -1) throw new Error(index);
    response.sendStatus(204).json;
  } catch (error) {
    response.status(404).json({error: 'resource not found' });
  }
});

module.exports = router;
