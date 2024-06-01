/* eslint-disable no-unused-vars */
import { Link, NavLink } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { FaWallet } from "react-icons/fa";
import NavLinks from "./NavLinks";
import Wrapper from "../assets/wrappers/Navbar";
import { useHomeContext } from "../pages/Layout";
import React, { useContext } from 'react';
import WalletContext from '../context/walletContext';

const Navbar = () => {
  const { toggleSidebar } = useHomeContext();
  const { walletAddress, isConnected, handleConnect, handleDisconnect } = useContext(WalletContext);

  const showAddress = walletAddress ? walletAddress.substring(0, 6) + '...' + walletAddress.substring(walletAddress.length - 4, walletAddress.length) : '';

  return (
    <Wrapper>
      <div className="navbar">
        <div className="navbar-start">
          <BsList size={22} className="menu-icon" onClick={toggleSidebar} />
          <NavLink to="/" className="title">
            transparensii
          </NavLink>
        </div>
        <div className="navbar-center">
          <Link to="/" className="title">
            <p>transparensii</p>
          </Link>
          <ul>
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          {isConnected ? (
            <>
              <span>{showAddress}</span>
              <FaWallet size={22} onClick={handleConnect} style={{ cursor: 'pointer', marginLeft: '10px' }} />
              <button onClick={handleDisconnect} style={{ marginLeft: '10px' }}>Disconnect</button>
            </>
          ) : (
            <FaWallet size={22} onClick={handleConnect} style={{ cursor: 'pointer' }} />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
