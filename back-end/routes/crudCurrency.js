const express = require('express');
const router = express.Router();
// const { currencies } = require('../currencies/data'); 
// const currency = require('../models/currency');
const currency = process.env.NODE_ENV === 'test' ? require('../models/testCurrency') : require('../models/currency')

router.get('/', async(request, response) => {
  try {
      const currencies = await currency.findAll();
      response.json(currencies);
  } catch (error) {
      response.status(500).json({ error: error.message });
  }
}
);

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
}
);

// router.post('/', async (request, response) => {
//   console.log('request recieved')
//   try {
//   const   { currencyCode, countryId, conversionRate } = request.body;
//   if (!currencyCode || !countryId || !conversionRate) {
//     return response.status(400).json({ error: 'content missing' });
//   }
//   const postCurrency = await currency.create({
//     currencyCode,       
//     countryId, 
//     conversionRate});
//     response.status(201).json(postCurrency); 
//     console.log('New Currency Created:', postCurrency);

// }
//   catch(error){
//     return response.status(201).json(error);
//   }
// });

// router.post('/', async (request, response) => {
//   console.log('request recieved')
//   try {
//     if (process.env.NODE_ENV !== 'test') {
//       const  { id, currencyCode, conversionRate } = request.body;
//       const postCurrency = await currency.create({
//         id,       
//         currencyCode, 
//         conversionRate});
//         response.status(201).json(postCurrency); 
//         console.log('New Currency Created:', postCurrency);
//         if (!id || !currencyCode|| !conversionRate) {
//         return response.status(400).json({ error: 'content missing' });
//     }
//   }
//  else {
//   const  { currencyCode, countryId, conversionRate } = request.body;
//   const postCurrency = await currency.create({       
//     currencyCode, 
//     countryId, 
//     conversionRate});
//     response.status(201).json(postCurrency); 
//     console.log('New Currency Created:', postCurrency);
//   if (!currencyCode || !countryId || !conversionRate) {
//     return response.status(400).json({ error: 'content missing' });
//   }
// } catch (error) {
//     return response.status(201).json(error);
//   }
// }
// });
router.post('/', async (request, response) => {
  console.log('Request received');
  try {
    // Destructure the request body to get id, currencyCode, conversionRate, nd countryId
    const { id, currencyCode, conversionRate, countryId } = request.body;
    // Check if id is provided nd if currencyCode or conversionRate is missin'
    if (id && (!currencyCode || !conversionRate)) {
      return response.status(400).json({ error: 'Currency code and conversion rate are required' });
    }
     // Check if countryId is provided and if currencyCode or conversionRate is missin'
    if (countryId && (!currencyCode || !conversionRate)) {
      return response.status(400).json({ error: 'Currency code and conversion rate are required' });
    }

    // Create currency wid id..
    if (id) {
      const postCurrency = await currency.create({ id, currencyCode, conversionRate });
      response.status(201).json(postCurrency);
      console.log('New Currency Created:', postCurrency);
    }
    // Create currency wid countryId..
    else if (countryId) {
      const postCurrency = await currency.create({ currencyCode, countryId, conversionRate });
      response.status(201).json(postCurrency);
      console.log('New Currency Created:', postCurrency);
    }
    // No id or countryId provided..
    else {
      return response.status(400).json({ error: 'Either id or countryId must be provided' });
    }
  } catch (error) {
    console.error('Error creating currency:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
});
router.put('/:id/:newRate', async (request, response) => {
  try{
  const putId = parseInt(request.params.id);
  const newRate = parseFloat(request.params.newRate);
  const result2 = await currency.findByPk(putId);
  if (!result2) throw new Error('resource not found');
  result2.conversionRate = newRate;
  await result2.save(); //to save changes in the database..
  console.log('Updated currency:', result2);
  response.json(result2);            
  } catch (error){ 
    return response.status(404).json({error:'resource not found' })
  }  
});

router.delete('/:id', async (request, response) => {
  try {
    const deleteId = parseInt(request.params.id);
    const index = await currency.destroy({ where: { id: deleteId } });
    if (index !== -1) {
      response.sendStatus(204); 
      
    } else {
      response.status(404).json({ error: 'resource not found' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;

