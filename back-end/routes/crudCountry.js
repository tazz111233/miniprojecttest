const express = require('express');
const router = express.Router();
const country = require('../models/country')


router.get('/',async (request, response) => {
   try{
    const currencies = await country.findAll();
    response.json(currencies); 
   }
   catch (error){
    response.status(500).json({error: 'resource not found'})
   }
});  


router.post('/', async (request, response) => {
  try {
  const   { name } = request.body;
  if (!name) {
    return response.status(400).json({ error: 'content missing' });
  }
  const postCurrency = await country.create({
    name });
    return response.json(postCurrency);
}
  catch(error){
      return response.status(500).json({ error: 'Internal Server Error' })
  }
});


router.delete('/:id', async (request, response) => {
  try{
  const deleteId = parseInt(request.params.id);
  const index = await country.destroy ({where: {id:deleteId}});
    if (index !== -1) throw new Error(index);
    response.sendStatus(204);
  } catch (error) {
    response.status(404).json({error: 'resource not found' });
  }
});

module.exports = router;