// Function to convert currency to Naira
async function convertCurrency(amount, currencyType) {
    try {
        // Replace 'YOUR_API_KEY' with a real currency conversion API key
        const apiKey = '58c5nr043emd0a3dq1dv9isdb7';
        const apiUrl = `https://api.currencylayer.com/live?access_key=${apiKey}&currencies=GBP,EUR,USD,NGN`;

        const response = await axios.get(apiUrl);
        const exchangeRates = response.data.quotes;

        // Conversion rates for GBP, EUR, USD to NGN (Naira)
        const gbpToNgn = exchangeRates['USDEUR'] / exchangeRates['USDGBP'];
        const eurToNgn = exchangeRates['USDEUR'];
        const usdToNgn = 1;

        // Convert the amount based on the selected currency
        let convertedAmount = 0;
        switch (currencyType) {
            case 'pounds':
                convertedAmount = amount * gbpToNgn;
                break;
            case 'euros':
                convertedAmount = amount * eurToNgn;
                break;
            case 'usd':
                convertedAmount = amount * usdToNgn;
                break;
        }

        return convertedAmount.toFixed(2); // Limit to 2 decimal places
    } catch (error) {
        console.error('Error converting currency:', error);
        return null;
    }
}

// Event listener for the "Convert" button
document.getElementById('convertButton').addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('currencyAmount').value);
    const currencyType = document.getElementById('currencyType').value;

    if (isNaN(amount) || amount <= 0) {
        document.getElementById('result').innerHTML = 'Please enter a valid amount.';
        return;
    }

    const convertedAmount = await convertCurrency(amount, currencyType);

    if (convertedAmount !== null) {
        document.getElementById('result').innerHTML = `Converted Amount to NGN: ${convertedAmount} NGN`;
    } else {
        document.getElementById('result').innerHTML = 'Conversion failed. Please try again later.';
    }
});

// Event listener for the Nigerian phone number input (you can add validation as needed)
document.getElementById('phoneNumber').addEventListener('input', () => {
    const phoneNumber = document.getElementById('phoneNumber').value;
    // Add your phone number validation logic here
});
