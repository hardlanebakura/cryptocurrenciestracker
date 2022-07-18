import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './header.css';
import axios from 'axios';
const API_KEY = "BQ5MPCH9V4Q18W8P95SNMMNKTB7Y64YZAK";
//usually I hide API keys in env variables, but exposed it for easier demonstration purposes

const Header = () => {

  const navigate = useNavigate();

  const searchAddress = (event) => {

    const getAddress = (address, startBlock) => {

      axios.get(`http://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&apikey=${API_KEY}`)
      .then(response => response.data.result)
      .then(response => { 
        if (typeof(response) === "object" && response.length > 0) var navigateTo = (startBlock!== "") ? navigate(`/address/${address}?start_block=${startBlock}`) : navigate(`/address/${address}`);
      })
      .catch(error => console.log(error));

    }

    const clickedAddress = () => {
      const addressElementValue = event.target.value;
      const startBlockValue = event.target.parentNode.nextElementSibling.childNodes[0].value;
      getAddress(addressElementValue, startBlockValue);
    }

    const clickedBlock = () => {
      const addressElementValue = event.target.parentNode.previousElementSibling.childNodes[0].value;
      const startBlockValue = event.target.value;
      getAddress(addressElementValue, startBlockValue);
    }

    if (event.key === "Enter") {

        (event.target.id === "address") ? clickedAddress() : clickedBlock();

    }

  }

  return (
    <div className="header-wrapper">
        <div className="header">
            <h4><Link to = "/">The Ethereum Blockchain Explorer</Link></h4>
            <form>
            <div className="input_field">
                <input type="text" id="address" name="address" placeholder="Search by address" onKeyPress = { searchAddress } />
            </div>
            <div className="input_field">
                <input type="text" id="start-block" name="start-block" placeholder="Search by block" onKeyPress = { searchAddress } />
            </div>
            </form>
        </div>
    </div>
  )
}

export default Header