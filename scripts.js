function getCurrencyInfo() {
    console.log('getCurrencyInfo function is triggered.');

    const currencyCode = document.getElementById('toCurrency').value;
    const baseCurrency = document.getElementById('fromCurrency').value;
    const amount = document.getElementById('amount').value;
    const apiKey = 'fca_live_TD5xtbCzC09ORTmtHhEiX4zGCe4DqugsYBWKrnT4';
    const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=${currencyCode}&base_currency=${baseCurrency}`;
    const spanElement = document.querySelector('#result p span');
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.data && Object.keys(data.data).length > 0) {
                const currencyInfo = data.data[currencyCode];
                
                console.log('Currency Information:', currencyInfo);
                const exchangeRate = currencyInfo;
                spanElement.textContent = `Converted amount: ${Math.round(exchangeRate * amount * 100) / 100}`;
                

            } else {
                console.error('No data available for the specified currency.');
                
                spanElement.textContent = 'Error: No data available for the specified currency'
            }
            document.getElementById('result').classList.add('show');
        })
        .catch(error => {
            console.error('Error fetching data:', error.message);
            
        });
}