const express = require('express')  // We import the express application
const cors = require('cors') // Necessary for localhost
const app = express() // Creates an express application in app
const morgan = require('morgan');
const {setupMW} = require('./utils/middleware');

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors())
app.use(express.json())

setupMW(app);
app.use(morgan('dev'));



/**
 * DATA STORAGE
 * We're using a local variable 'currencies' to store our data: a list of currency objects
 * Each object represents a 'currency', and contains the following fields
 * id: a number, 
 * currencyCode: a string, three letters (see https://www.iban.com/currency-codes as reference)
 * country: a string, the name of the country
 * conversionRate: the amount, in that currency, required to equal 1 Canadian dollar
 */
let currencies = [
  {
    id: 1,
    currencyCode: "CDN",
    country: "Canada",
    conversionRate: 1
  },
  {
    id: 2,
    currencyCode: "USD",
    country: "United States of America",
    conversionRate: 0.75
  }
]

/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
app.get('/', (request, response) => {
  response.send('Hello World!')
})

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: host:3ttp://localh001/api/currency/
 * @responds with returning the data as a JSON
 */
app.get('/api/currency/', (request, response) => {
  response.json(currencies)
})

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
app.get('/api/currency/:id', (request, response) => {
  const getId = parseInt(request.params.id);
  // route parameters r typically passed as strings, nd parseInt ensures tht it's treated as a number...
  //parseInt is used to convert it into an integer...
  const result = currencies.find((call) => call.id === getId);//.find method is used to search through
  if (!result) { //falsy...
    // Currency not found
    return response.status(404).json({ error: 'resource not found' });
  }
  response.json(result);
}); 



/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
app.post('/api/currency', (request, response) => {
  const { currencyCode, country, conversionRate} = request.body; 
  //checking if the content is missin'
  if (!currencyCode || !country || !conversionRate) {
    return response.status(400).json({error: 'content missing'})
  }
   //create new obj..
   const postCurrency = {currencyCode , country , conversionRate}; 
   currencies.push(postCurrency); //push is a method used to add elements to the end of an array...
   console.log('New Currency Created:', postCurrency);
   response.status(201).json(postCurrency); 
}); 


/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
app.put('/api/currency/:id/:newRate', (request, response) => {
   const putId = parseInt(request.params.id);
   const newRate = parseFloat(request.params.newRate);
   const result2 = currencies.find((c) => c.id === putId); 
   if (!result2) {
    return response.status(404).json({error: 'resource not found'})
   }
   result2.conversionRate = newRate;
   response.json(result2);
}); 

/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
app.delete('/api/currency/:id', (request, response) => {
  const deleteId = parseInt(request.params.id); 
  currencies = currencies.filter((del) => del.id !== deleteId); 
  response.sendStatus(204); //204 [successful deletion]...
}); 

// //Unknown Endpoint
// app.use((req, res)=> {
//   res.status(404).json({error:'MW-unknown endpoint'});
// });

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})


