import React from 'react';
import './footer.css';
import logo from './ethereum-logo.png';

const Footer = () => {
  return (
    <div className="footer">
      <div id="footer__content">
        <div id="footer__content__details">
          <div id="footer__content__logo">
            <img id = "footer__logo" src = { logo } />
            <div id="footer__info">
              Powered by Ethereum
            </div>
          </div>
          <div id="footer__content__info">
              Etherscan is a Block Explorer and Analytics Platform for Ethereum, a decentralized smart contracts platform.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer