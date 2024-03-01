import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from 'axios'; 
import Conversion from "../../components/Conversion";

test('Testing conversion section', async () => {//asynchronous test
    // let currenciesData;
    // try {
    //     const res = await axios.get('http://localhost:3001/api/currency');
    //     currenciesData = res.data;
    // } catch (error) {
    //     console.error('Error fetching currency data:', error);
    //     return;
    // }
    const currenciesData = [
        {
            id: 1, 
            currencyCode: 'CDN',
            conversionRate: 1
          },
          {
            id: 2,
            currencyCode: 'USD',
            conversionRate: 0.75
          }
    ]
    ///After fetchin' the currency data, it renders the Conversion component wid the fetched data
    render(<Conversion currenciesData={currenciesData} />);
    
    //user behavior by usin' the userEvent.type function to type text into input fields => den, onClick "Convert" button by using userEvent.click 
    const currencyFrom = screen.getByLabelText("Currency Code From:");
    userEvent.type(currencyFrom, 'CDN');

    const amount = screen.getByLabelText("Amount:");
    userEvent.type(amount, '100');

    const currencyTo = screen.getByLabelText("Currency Code To:");
    userEvent.type(currencyTo, 'USD');

    const convertButton = screen.getByText("Convert");
    userEvent.click(convertButton);

    const convertedAmount = screen.getByText(/Converted Amount:/i);//:/i mkes the matchin' case insensitive
    expect(convertedAmount).toBeInTheDocument();
});
