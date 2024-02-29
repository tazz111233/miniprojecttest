const convertCurrency = (currencyA, currencyB, amount) => {
  console.log('Currency From:', currencyA);
  console.log('Currency To:', currencyB);
  // Check if the conversion is between the same currency
  if (currencyA === currencyB) {
    return amount; // return the amount unchanged
  }
  // Verify conversion rates
  console.log('Currency A Conversion Rate:', currencyA.conversionRate);
  console.log('Currency B Conversion Rate:', currencyB.conversionRate);
  // Check if conversion rates are valid numbs.
  if (typeof currencyA.conversionRate !== 'number' || typeof currencyB.conversionRate !== 'number' ||
      isNaN(currencyA.conversionRate) || isNaN(currencyB.conversionRate)) {
    console.error('Invalid conversion rates.');
    return NaN;
  }
  // Check if conversion rates are zero
  if (currencyA.conversionRate === 0 || currencyB.conversionRate === 0) {
    console.error('Conversion rate cannot be zero.');
    return NaN;
  }
  // Calculate the converted amount based on the conversion rates of the two currencies
  const convertedAmount = amount * (currencyB.conversionRate / currencyA.conversionRate);
  // Return the converted amount as an integer
  return Math.round(convertedAmount);
};
export default convertCurrency;
