import React, { useState, useEffect } from 'react';
import './charts.css';
import Navbar from '../navbar/Navbar';
import { Gecko } from '../../api_classes/CoinGecko';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFusionCharts from 'react-fusioncharts';
import { Charts as c } from './subsidiary_functions';

const Charts = () => {
    
  const [chartDataSource, setChartDataSource] = useState({});
  const daysOption = { 0:0.5, 1:1, 2:7, 3:30 }
  
  const handleCoinNameChange = (e) => {
    getCoins(e.target.value.toLowerCase(), daysOption[e.target.nextElementSibling.selectedIndex]);
  }

  const handleCoinTimingChange = (e) => {
    getCoins(e.target.previousElementSibling.value.toLowerCase(), daysOption[e.target.selectedIndex]);
  }

  const handleE = () => {
    charts(FusionCharts);
    if (chartDataSource.data !== undefined) chartDataSource.data = chartDataSource.data.prices;

    return <ReactFusionCharts 
      type = "line"
      width = "100%"
      height = "100%"
      dataFormat = "JSON"
      dataSource = { chartDataSource }
      />
  }

  const getCoins = (coinId, coinTiming) => {
    Gecko.getChartsForCoin(coinId, coinTiming)
    .then(response => response.data)
    .then(response => {
        console.log(response);
        const selected = coinTiming;
        const prices = (selected === 0) ? c.get12HoursChart(response.prices) : (selected === 1) ? c.getDayChart(response.prices) : (selected === 2) ? c.getWeekChart(response.prices) : c.getMonthChart(response.prices);
        setChartDataSource({
          chart: {
            caption: `${coinId}`,
            subcaption: "",
            yaxisname: "Prices change",
            numbersuffix: "USD",
            rotatelabels: "1",
            setadaptiveymin: "1",
            theme: "fusion"
          },
          data: {
            prices
          }
        })
    })
    .then(error => {});
  }

  useEffect(() => {
    if (chartDataSource.data === undefined) getCoins("bitcoin", 0.5);
    handleE();
  }, [chartDataSource]);

  return (

    <div id="charts">
        <Navbar />
        <div id="chart-menu">
            <select id = "coin__name" onClick = { handleCoinNameChange } >
                <option>Bitcoin</option>
                <option>Ethereum</option>
                <option>Tether</option>
                <option>Shiba-Inu</option>
            </select>
            <select id = "coin__timing" onClick = { handleCoinTimingChange } >
                <option>Last 12 hours</option>
                <option>Last 24 hours</option>
                <option>Last week</option>
                <option>Last month</option>
            </select>
        </div>
        <div id = "chart-table">
          { (chartDataSource.chart !== undefined) ? handleE() : "No data to display" }
        </div>
    </div>
  )
}

export default Charts