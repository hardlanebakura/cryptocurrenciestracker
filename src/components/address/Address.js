import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './address.css';
import '../index_page/index_page.css';
import axios from 'axios';
import { Address as Addr } from '../../api_classes/Address';
import { Gecko } from '../../api_classes/CoinGecko';

const API_KEY = "BQ5MPCH9V4Q18W8P95SNMMNKTB7Y64YZAK";
//usually I hide API keys in env variables, but exposed it for easier demonstration purposes

const Address = () => {

  const address = useLocation().pathname.split("address/")[1];
  const startBlock = new URLSearchParams(useLocation().search).get("start_block");

  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [ethers, setEthers] = useState(0);
  var address1 = new Addr(address);
  
  useEffect(() => {

    getTransactions(address, startBlock);
    getBalance(address, startBlock);

  }, [address]);

  const getTransactions = (address, startBlock) => {
    axios.get(`http://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&sort=desc&apikey=${API_KEY}`)
    .then(response => response.data.result)
    .then(response => { address1.setTransactions(response); setTransactions(address1.transactions); })
    .catch(error => console.log(error));
  }

  const getBalance = (address, startBlock) => {

    axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${API_KEY}`)
    .then(response => response.data.result)
    .then(response => {
      Gecko.getValue(response)
      .then(currency => {
        address1.setBalance(response, currency);
        console.log(address1);
        setBalance(address1.balance);
        setEthers(address1.etherValue);
      } )})
    .catch(error => console.log(error));

  }

  return (
    <div className="address">
      <div className="address__title">
        Address { address }
      </div>
      <div className="address__overview-wrapper">
        <div className="address__overview">
          <div className="address__overview__field b title-center">
            Overview
          </div>
          <div className="address__overview__field">
            <div className="address__overview__field__title">
              Balance
            </div>
            <div className="address__overview__field__value">
              { balance } Ether
            </div>
          </div>
          <div className="address__overview__field">
            <div className="address__overview__field__title">
              Ether Value
            </div>
            <div className="address__overview__field__value">
              { ethers }
            </div>
          </div>
        </div>
      </div>
      <div className="address__transactions">
        <div className="address__transactions__title">
          Transactions
        </div>
        { (transactions.length < 26) 
        ? <div className="transactions-display">Showing <span>{ transactions.length }</span> transactions.</div>
        : <div className="transactions-display">Latest 25 from a total of <span>{ transactions.length }</span> transactions.</div>  
        }
        <table id = "transactions">
          <thead>
            <tr>
            <th>#</th>
            <th>Hash</th>
            <th>Method</th>
            <th>Block</th>
            <th>Age</th>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
            <th>In/Out</th>
            </tr>
        </thead>
        <tbody>
          { transactions.slice(0, 25).map(function (transaction, index) {
            return (
              <tr key={ index }>
                <td><div>{ index + 1 }</div></td>
                <td><div>{ transaction.hash }</div></td>
                <td><div>Transfer</div></td>
                <td><div>{ transaction.block }</div></td>
                <td><div>{ transaction.age }</div></td>
                <td><div><Link to = {`/address/${ transaction.from }`}>{ transaction.from }</Link></div></td>
                <td><div><Link to = {`/address/${ transaction.to }`}>{ transaction.to }</Link></div></td>
                <td><div>{ transaction.e }</div></td>
                <td>{ transaction.in === "in" ? <div className="transaction-in">IN</div> : <div className="transaction-out">OUT</div>}</td>
              </tr>
            )
          }) }
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Address