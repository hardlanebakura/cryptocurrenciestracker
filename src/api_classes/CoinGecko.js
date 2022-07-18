const axios = require('axios');
var currencyData = require('../data/data.json');

const URL = "https://api.coingecko.com/api/v3/";

const currencyConvert = (current, currencyToBeConvertedTo="USD") => {

    currencyData = Object.entries(currencyData).map(([k, v]) => ({[k]:v}));
    for (const [index, item] of Object.entries(currencyData)) { for (const [k, v] of Object.entries(item)) currencyData[index] = v; }
    const find = (currenc) => { return currencyData.find(x => x.code === currenc).rate }
    return (1 / find(current)) * find(currencyToBeConvertedTo);

}

const parseLocaleNumber = (stringNumber, locale="en-US") => {

    stringNumber = stringNumber.replace(/[^\d.,-]/g, '');
    var thousandSeparator = Intl.NumberFormat(locale).format(11111).replace(/\p{Number}/gu, '');
    var decimalSeparator = Intl.NumberFormat(locale).format(1.1).replace(/\p{Number}/gu, '');

    return parseFloat(stringNumber.replace(new RegExp('\\' + thousandSeparator, 'g'), '').replace(new RegExp('\\' + decimalSeparator), '.'));
    
}

class Gecko {

    constructor (data) {

        this.id = data.id;
        this.image = data.image;
        this.symbol = data.symbol.toUpperCase();
        this.price = this.format(data.current_price);
        this.price_24 = data.price_change_percentage_24h.toFixed(2);
        this.market_cap = this.format(data.market_cap);
        this.market_cap_24 = data.market_cap_change_percentage_24h.toFixed(2);
        this.total_volume = this.format(data.total_volume);
        this.circulating_supply = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(Math.round(data.circulating_supply));

    }

    format (number, currency="USD") {

        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 0 }).format(number);

    }

    static async getValue () {
        
        var balance = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD`)
        balance = await balance.data;
        return balance;

    }
    
    static changeCurrencies (previousCurrency, currency, geckos) {

        const currencyVal = currencyConvert(previousCurrency, currency);
        for (const [index, item] of Object.entries(geckos)) {
            item.price = item.format(parseLocaleNumber(item.price) * currencyVal, currency);
            item.market_cap = item.format(parseLocaleNumber(item.market_cap) * currencyVal, currency);
            item.total_volume = item.format(parseLocaleNumber(item.total_volume) * currencyVal, currency);
        }
        return geckos;

    }

}

const getAllCoins = async () => {

    const response = await axios.get(`${URL}coins/markets?vs_currency=USD`);
    const bitcoinRankings = response.data.map((item) => new Gecko(item));
    return bitcoinRankings;

}

module.exports.getAllCoins = getAllCoins;
module.exports.Gecko = Gecko;

