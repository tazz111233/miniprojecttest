const express = require('express');
const router = express.Router();
const Currency = require('../models/currency');
const Country  = require('../models/country');


router.get('/currency-countryName', async (req, res) => { 
  try {
    // const ccId = Number(req.params.id)
    // const cId = await Currency.findByPk(ccId).countryId 
    // const Kuwait = await Country.findByPk(cId).name 
    // res.status(201).json(cId, Kuwait);
    const givenCurrencies = await Currency.findAll({
      include: [{ model: Country, attributes: ['name'] }],//Country model to retrieve associated country names.
      attributes: ['currencyCode'],// Retrieving only the 'currencyCode' attribute for each currency.
    });
    const countryWid = givenCurrencies.map(currency => ({
      currencyCode: currency.currencyCode,
      countryName: currency.Country.name,
    }));
    res.json(countryWid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;