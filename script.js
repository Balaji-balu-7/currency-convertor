async function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const from = document.getElementById("fromCurrency").value;
    const to = document.getElementById("toCurrency").value;
    const resultElement = document.getElementById("result");

    if (isNaN(amount) || amount <= 0) {
        resultElement.textContent = "Please enter a valid amount.";
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await response.json();

        if (!data.rates[to]) {
            resultElement.textContent = "Conversion rate not available.";
            return;
        }

        const rate = data.rates[to];
        const convertedAmount = (amount * rate).toFixed(2);
        resultElement.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        resultElement.textContent = "Error fetching exchange rates.";
        console.error(error);
    }
}
