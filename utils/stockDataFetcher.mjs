import axios from 'axios';

async function fetchStockData(symbol) {
    const apiKey = 'dW9ujJZFvu5gKCJWVXH1IBAE2q_pU5Nk';
    const url = `https://api.polygon.io/v2/last/trade/${symbol}?apiKey=${apiKey}`;

    try {
        // Fetch stock data from the API
        const response = await axios.get(url);
        
        // Parse the JSON response
        const jsonData = response.data;

        // Check if the response contains the 'p' key
        if (jsonData.results && jsonData.results.p !== undefined) {
            // Extract and return the stock price ('p') from the response
            return jsonData.results.p;
        } else {
            return null;
             throw new Error('Stock price not found in the response');
        }
    } catch (error) {
        throw error;
        }
}

export { fetchStockData };
