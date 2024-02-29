import React, { useState } from 'react';
// import '../index.css';
import convertCurrency from "../utils/currency_utils";

function Conversion({ currenciesData }) {
    const [convertCode, setConvertCode] = useState('');//track the selected conversion code in the dropdown list
    const [currencyFrom, setCurrencyFrom] = useState('');//for storing currency code from which conversion starts
    const [currencyTo, setCurrencyTo] = useState('');//for storing currency code to which conversion is done
    const [amount, setAmount] = useState('');//for storing the amount to be converted
    const [convertedAmount, setConvertedAmount] = useState(null); //for storing the converted amount
    
    //handle changes in input fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        // // Update the corresponding state based on the input field name
        if (name === 'currencyFrom') {
            setCurrencyFrom(value);
        } else if (name === 'currencyTo') {
            setCurrencyTo(value);
        } else if (name === 'amount') {
            setAmount(value);
        }
    }; 
    //handle currency conversion
    const handleConvert = () => { 
        // Find currency objects corresponding to currencyFrom and currencyTo
        const currencyA = currenciesData.find(currency => currency.currencyCode === currencyFrom);
        const currencyB = currenciesData.find(currency => currency.currencyCode === currencyTo);
        // Check if both currencies are found
        if (currencyA && currencyB) {
            // Perform the currency conversion using the conversion function which is convertCurrency
            const result = convertCurrency(currencyA, currencyB, parseFloat(amount));//convertin' the amount from a string to a floatin'-number to recieve a numeric value for the amount. 
            // Update the state with the converted amount
            setConvertedAmount(result);
            console.log('converted amount:', result);
            setConvertCode(result);
        } else {
            console.error("One or both currencies not found.");
        }
    };
    
    
    return (
        <div className="Conversion-container">
            <h2 className="title">Convert Currency</h2>
            <select className="select-field" value={convertCode} onChange={handleChange} name="convertCode">
                <option value="">Select code</option>
                {currenciesData.map(currency => (
                    <option key={currency.id} value={currency.currencyCode}>{currency.currencyCode}</option>
                ))}
            </select>
            <form>
                <div className="form-field">
                    <label htmlFor="currencyFrom">Currency Code From:</label>
                    <input 
                        className="input-field" 
                        type="text" 
                        id="currencyFrom" 
                        name="currencyFrom" 
                        value={currencyFrom} 
                        onChange={handleChange}
                    />     
                </div>
                <div className="form-field">
                    <label htmlFor="amount">Amount:</label> 
                    <input 
                        className="input-field"  
                        type="number" 
                        id="amount" 
                        name="amount" 
                        value={amount} 
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="currencyTo">Currency Code To:</label>
                    <input 
                        className="input-field" 
                        type="text" 
                        id="currencyTo" 
                        name="currencyTo" 
                        value={currencyTo} 
                        onChange={handleChange}
                    /> 
                </div>
                <button  
                    className="convert-button" 
                    type="button" 
                    onClick={handleConvert}>Convert
                </button>
            </form>
            <div>Converted Amount: ${convertedAmount}</div>
        </div>
    );
}

export default Conversion;
