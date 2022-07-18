import React, { useState, useEffect } from 'react';
import './index_page.css';
import axios from 'axios';
import { ArrowDropUp as ArrowUp, ArrowDropDown as ArrowDown } from '@mui/icons-material';
const { getAllCoins, Gecko } = require('../../api_classes/CoinGecko');

const IndexPage = () => {
  const URL = "https://api.coingecko.com/api/v3/";

  const [bitcoinRanking, setBitcoinRanking] = useState([]);
  const [currency, setCurrency]  = useState("USD");

  useEffect(() => {

    getBitcoinRanking();

  }, []);

  const getBitcoinRanking = () => {

    getAllCoins().then(response => setBitcoinRanking(response));

  }

  const handleChange = (event) => {

    console.log(event.target.value);
    setBitcoinRanking(Gecko.changeCurrencies(currency, event.target.value, bitcoinRanking));
    setCurrency(event.target.value);

  }

  return (
        <div className="main">
            { bitcoinRanking.length > 0 && 
            <div id = "table__wrapper">
                <table id ="bitcoin-ranking">
                    <thead>
                        <tr>
                        <th scope="col">
                        <select onChange = { handleChange }>
                            <option>USD</option>
                            <option>EUR</option>
                            <option>GBP</option>
                            <option>JPY</option>
                        </select>
                        </th>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Price 24h%</th>
                        <th scope="col">Market Cap</th>
                        <th scope="col">Market 24h%</th>
                        <th scope="col">Total Volume</th>
                        <th scope="col">Circulating Supply</th>
                        </tr>
                    </thead>
                    <tbody>
                        { bitcoinRanking.map(function(bitcoin, index) {
                            return (
                                <tr key = { index }>
                                    <td>&nbsp;</td>
                                    <td>{ index + 1 }</td>
                                    <td className="coin__image-and-details__wrapper" >
                                        <div className="coin__image-and-details">
                                            <img src={ bitcoin.image } />
                                            <div className="coin__name">
                                                <div className="coin__id">{ bitcoin.id }</div>
                                                <div className="coin__symbol">{ bitcoin.symbol }</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="coin__price">
                                            { bitcoin.price }
                                        </div>
                                    </td>
                                    <td>
                                            { (bitcoin.price_24 > 0) 
                                            ? <div className="coin__24 pct_u"><ArrowUp />{ bitcoin.price_24 }% </div>
                                            : <div className="coin__24 pct_d"><ArrowDown />{ bitcoin.price_24 }% </div> }
                                    </td>
                                    <td>
                                        <div className="coin__market-cap">
                                            { bitcoin.market_cap }
                                        </div>
                                    </td>
                                    <td>
                                        <div className="coin__market-cap-24">
                                        { (bitcoin.market_cap_24 > 0) 
                                            ? <div className="coin__24 pct_u"><ArrowUp />{ bitcoin.market_cap_24 }% </div>
                                            : <div className="coin__24 pct_d"><ArrowDown />{ bitcoin.market_cap_24 }% </div> }
                                        </div>
                                    </td>
                                    <td>
                                        <div className="coin__total-volume">
                                            { bitcoin.total_volume }
                                        </div>
                                    </td>
                                    <td>
                                        <div className="coin__circulating">
                                            { bitcoin.circulating_supply } { bitcoin.symbol }
                                        </div>
                                    </td>
                                </tr>
                            )

                        }) }
                    </tbody>
                </table></div>
            }
        </div>
  )
}

export default IndexPage