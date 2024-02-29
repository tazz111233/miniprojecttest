import convertCurrency from '../../utils/currency_utils';


//Conversion rates for different currencies

const cdnCurrency = {
  conversionRate: 1 
}

const usdCurrency = {
  conversionRate: 0.75
}

const gbpCurrency = {
  conversionRate: 0.58
}

/**
 * Tests follow the format of 
 * test('description', () => { ...your code here... })
 * Please read here: https://jestjs.io/docs/getting-started
 * for more information on using jest to perform testing
 */


describe('Currency Conversion Tests', () => {//Jest's describe function to group related tests together.
/**
 * Test 1: Completed
 * This test performs a currency conversion, where it's really just the same currency
 * Therefore, we should return the same amount 
 */
test('same currency conversion', () => {
  const amount = 100
  const result = convertCurrency(cdnCurrency, cdnCurrency, amount)
  expect(result).toBe(amount)
})

/**
 * Test 2: TODO
 * Write a test that performs a currency conversion from CDN to GBP, for $100 CDN
 * Hint: the result should be $58 GBP according to our provided currencies.
 */
test('$100 CDN to GBP conversion', () => {
  const amountCDN = 100;
  const expectedAmountOfGBP = 58;
  //  Test Amount: $100 CDN
  //  Expected Result: $58 GBP
  //  Conversion Rate = Expected Amount in GBP / Amount in CDN
  //                                = $58 GBP / $100 CDN
  //                                      0.58
  const result = convertCurrency(cdnCurrency, gbpCurrency, amountCDN);
  expect(result).toBeCloseTo(expectedAmountOfGBP);
})

/**
 * Test 3: TODO
 * Write a test that performs a currency conversion from CDN to USD, for $75 CDN
 */
test('$75 CDN to USD conversion', () => {
  const amountCDN = 75;
    const expectedAmountOfUSD = 56; 
    // Test Amount: $75 CDN
    // Expected Result: $56 USD
    // Conversion Rate = Expected Amount in USD / Amount in CDN
    //                               = $56 USD / $75 CDN
    //                                      0.75
    const result = convertCurrency(cdnCurrency, usdCurrency, amountCDN);
    expect(result).toBeCloseTo(expectedAmountOfUSD);
})

/**
 * Test 4: TODO
 * Write a test that performs a currency conversion from USD to GBP, for $200 USD
 */
test('$200 USD to GBP conversion', () => {
  const amountUSD = 200;
  const expectedAmountGBP = 155; 
  // Test Amount: $200 USD
  // Expected Result: $155 GBP
  // Conversion Rate = Expected Amount in USD / Amount in CDN
  //                               = $56 USD / $75 CDN
  //                                      0.75

  const result = convertCurrency(usdCurrency, gbpCurrency, amountUSD);
  expect(result).toBeCloseTo(expectedAmountGBP);
})

/**
 * Test 5: TODO
 * Write a test that performs a currency conversion from GBP to CDN, for $50 GBP
 */
test('$50  CDN to USD conversion', () => {
  const amountGBP = 50;
  const expectedAmountCDN = 86; 
  // Test Amount: $50 GBP
  // Expected Result: $86 CDN
  // Conversion Rate = Expected Amount in CDN / Amount in GBP
  //                               = $86 CDN / £50 GBP
  //                                      1.72
  const result = convertCurrency(gbpCurrency, cdnCurrency, amountGBP);
  expect(result).toBeCloseTo(expectedAmountCDN);
 });
}); 