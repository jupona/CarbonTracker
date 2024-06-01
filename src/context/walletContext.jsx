// WalletContext.js
import  { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const web3 = new Web3(window.ethereum);
  const chainId = '11155111';

  useEffect(() => {
    const handleAccountsChanged = async (newAccounts) => {
      const networkId = await web3.eth.net.getId();
      if (Number(networkId) !== parseInt(chainId)) {
        Swal.fire('Oops...', 'Please select Sepolia testnet !!!', 'error');
        return;
      }
      const newAddress = newAccounts[0];
      setWalletAddress(newAddress);
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  useEffect(() => {
    if (walletAddress) {
      setIsConnected(true);
    }
  }, [walletAddress]);

  const handleConnect = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log("MetaMask is installed!");

      const networkId = await web3.eth.net.getId();
      console.log('networkId', networkId);
      const accounts = await web3.eth.getAccounts();
      console.log('accounts', accounts);
      const address = accounts[0];
      const showAddress = address.substring(0, 6) + '...' + address.substring(address.length - 4, address.length);
      console.log(address);
      if (Number(networkId) !== parseInt(chainId)) {
        Swal.fire('Oops...', 'Please select Sepolia testnet !!!', 'error');
      } else {
        Swal.fire(`Wallet address: ${showAddress} is connected successfully!`);
      }

      console.log('Wallet connected!');
      setWalletAddress(address);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    setIsConnected(false);
    Swal.fire('Wallet disconnected!');
  };

  return (
    <WalletContext.Provider value={{ walletAddress, isConnected, handleConnect, handleDisconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

WalletProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WalletContext;
