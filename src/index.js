import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Header, Footer, Address, IndexPage } from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Routes>
        <Route path = "/" element = {<Layout />}>
          <Route path = "/" element = {<IndexPage />} />
          <Route path = "/address/:string" element = {<Address />} />
        </Route>
      </Routes>
    </Router>
);

function Layout () {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )

}


