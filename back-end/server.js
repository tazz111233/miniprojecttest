require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const { setupMW } = require('./utils/middleware');
const data = require('./storage/data'); 
const sequelize = require('./config/sequelize')
const currencyCountryRoute = require('./routes/cCRoute');
const currencyRoutes = require('./routes/crudCurrency');
const countryRoutes = require('./routes/crudCountry')

app.use(cors());
app.use(express.json());
setupMW(app);
app.use((req, res, next) => {
  req.data = data;  
  next();
});
app.use('/api/currency', currencyRoutes);
app.use('/api/country', countryRoutes); 
app.use('/', currencyCountryRoute);
app.use((req, res) => { // Unknown Endpoint
  res.status(404).json({ error: 'MW-unknown endpoint' });
});
//Connection
const PORT = 3001;
sequelize.sync().then(() => {
  console.log("connected to PG")
  app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`)
  })
})
.catch((error) => {
  console.error("syncing database error", error);
})
