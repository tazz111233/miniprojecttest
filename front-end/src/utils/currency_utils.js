// /**
//  * This file is meant to be where you will complete the utility function below, for performing a conversion of some amount
//  * to another currency.
//  */

// /**
//  * TODO:
//  * @receives two currency objects, currencyA and currencyB, as well as an integer-amount of cash in currencyA
//  * @performs a currency conversion between integer amount of currencyA to an integer amount of currencyB
//  * @returns an integer
//  */
// const convertCurrency = (currencyA, currencyB, amount) => {
//   // This needs to be implemented
//   return 1
// }

// module.exports = convertCurrency

const convertCurrency = (currencyA, currencyB, amount) => {
  // Check if the conversion is from currencyA to currencyA, return the amount directly
  if (currencyA === currencyB) {
    return amount;
  }

  // Calculate the converted amount based on the conversion rates of the two currencies
  const convertedAmount = amount * (currencyB.conversionRate / currencyA.conversionRate);

  // Return the converted amount as an integer
  return Math.round(convertedAmount);
};

module.exports = convertCurrency;
