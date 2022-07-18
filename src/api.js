const axios = require('axios');
const { getAllCoins, weiToEther } = require('./api_classes/CoinGecko');
const web3 = require('web3');
const { Transaction } = require('./api_classes/Address');

const API_KEY = "BQ5MPCH9V4Q18W8P95SNMMNKTB7Y64YZAK";

//const URL = "https://api.coingecko.com/api/v3/";
const URL = "https://api.etherscan.io/api";

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

const transferCodes = { "Transfer": "", 
"Set Approval": "setApprovalForAll(address operator, bool authorized)", 
"Presale Mint": "presaleMint(uint64 quantity, uint256 allowed, bytes32[] proof)",
"Deposit": "deposit()",
"Multicall": "multicall(uint256 deadline, bytes[] data)",
"Whitelist Mint": "whitelistMint(uint256 num, bytes32[] proof)"}

async function main() {

    const address = "0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f";
    // make an API call to the ABIs endpoint 0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f
    // 0xde0b295669a9fd93d5f28d9ec85e40f4cb697
    // 0xd50d8df8f5ad747899b8b23fa0dc1c166c82de12
    const response = await axios.get(`https://api.etherscan.io/api?module=logs&action=getLogs&address=${address}&apikey=${API_KEY}`);
    const data = await response.data;

    //&page=1&offset=1000
    // print the JSON response 
    let abi = data.result;
    //console.log(abi);

    const responseHistory = await axios.get(`http://api.etherscan.io/api?module=account&action=txlist&address=0x45f3A446fa24006314488D66da064B967B471fFd&apikey=BQ5MPCH9V4Q18W8P95SNMMNKTB7Y64YZAK`);
    const d = await responseHistory.data;
    console.log(d.result.length);
    console.log("1");

    axios.get(`http://api.etherscan.io/api?module=account&action=txlist&address=0xd50d8df8f5ad747899b8b23fa0dc1c166c82de12&sort=desc&apikey=${API_KEY}`)
    .then(response => response.data.result)
    .then(response => { for (const item of response.slice(0, 25)) { console.log(item); }})
    .catch(error => console.log(error));
    
}

//main();

    axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD`)
    .then(response => response.data)
    .then(response => console.log(response))
    .catch(error => console.log(error));