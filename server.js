require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const { setupMW } = require('./utils/middleware');
const currencyRoutes = require('./routes/crudRoutes');
const data = require('./currencies/data'); 
const sequelize = require('./config/sequelize')

app.use(cors());
app.use(express.json());
setupMW(app);

app.use((req, res, next) => {
  req.data = data; 2 
  next();
});

app.use('/', currencyRoutes);

// Unknown Endpoint
app.use((req, res) => {
  res.status(404).json({ error: 'MW-unknown endpoint' });
});

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
