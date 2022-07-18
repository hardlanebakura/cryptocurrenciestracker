const axios = require('axios');

const getTime = (current, previous) => {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) return Math.round(elapsed/1000) + ' seconds ago';

    else if (elapsed < msPerHour) return Math.round(elapsed/msPerMinute) + ' minutes ago';

    else if (elapsed < msPerDay ) return Math.round(elapsed/msPerHour ) + ' hours ago';   

    else if (elapsed < msPerMonth) return Math.round(elapsed/msPerDay) + ' days ago';  

    else if (elapsed < msPerYear) return Math.round(elapsed/msPerMonth) + ' months ago';   

    else return Math.round(elapsed/msPerYear ) + ' years ago';  

}

class Address {

    constructor(id) {

        this.id = id;
        this.transactions = [];

    }

    setTransactions(data) {

        for (const item of data) this.transactions.push(new Transaction(item, this.id));

    }

    setBalance(data, currency) {

        this.balance = (data / 10**18).toFixed(2);
        this.etherValue = "$" + (this.balance * currency.ethereum.usd).toFixed(2);

    }

}

class Transaction {

    constructor(data, address) {

        this.hash = data.hash;
        this.block = data.blockNumber;
        this.age = getTime(new Date(), data.timeStamp*1000);
        this.from = data.from;
        this.to = data.to;
        if (typeof (address) !== "undefined") { this.in = (data.from === address) ? "out" : "in" };
        this.e = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 7}).format(data.value / 10**18) + " Ether";

    }

}

module.exports.Address = Address;
module.exports.Transaction = Transaction;