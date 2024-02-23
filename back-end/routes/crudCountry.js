const express = require('express');
const router = express.Router();
const Country = require('../models/country')
const Currency = require('../models/currency');

router.get('/',async (request, response) => {
   try{
    const currencies = await Country.findAll();
    response.json(currencies); 
   }
   catch (error){
    response.status(500).json({error: 'resource not found'})
   }
});  

router.post('/', async (request, response) => {
  try { 
  const name  = request.body;
  if (!name) { 
    return response.status(400).json({ error: 'content missing' });
  }  
  const postCurrency = await Country.create(
    name );  
    console.log(name) 
    return response.json(postCurrency);
} 
  catch(error){  
      return response.status(500).json({ error: 'Internal Server Error' })
  } 
}); 

router.delete('/:id', async (request, response) => {
  try{
  const deleteId = parseInt(request.params.id);
  await Currency.destroy({ where: { countryId: deleteId } });
  const rows = await Country.destroy ({where: {id:deleteId}});
  if (rows > 0) {
    response.status(204).json({ msg:'deleted successfully' })
  } else {
    response.status(404).json({ err: 'resource not found' });
  }
  } catch (error) {
    console.error('Error deletin country:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;