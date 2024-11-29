// src/components/ConnectWalletButton.js
import React, { useEffect, useState } from "react";
import { useWeb3 } from "../contexts/Web3Context";
import styled from "styled-components";
import Web3Modal from 'web3modal'
import { ethers, providers } from "ethers";
import WalletConnectProvider from '@walletconnect/web3-provider'
const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 8px;
    font-size: 14px;
  }
`;

const ConnectWalletButton = () => {
const [web3Modal, setWeb3Modal] = useState(null)
const [address, setAddress] = useState("")
const checkWalletIsConnected = () => {
  const { ethereum } = window;
  if (!ethereum) {
      console.log("Make sure you have meta masked installed");
      return;
  } else {
      console.log("wallet exists! we are ready to go")
  }
}
useEffect(() => {
  checkWalletIsConnected();
}, [])
  useEffect(() => {
    // initiate web3modal
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                // Mikko's test key - don't copy as your mileage may vary
                infuraId: "05f311673625f063cd5c0736f5bb17b0",
            }
        },
    };

    const newWeb3Modal = new Web3Modal({
        cacheProvider: true, // very important
        // network: 'binance',
        // chainId: 56,
        providerOptions,
    });

    setWeb3Modal(newWeb3Modal)
}, []);
  async function connectWallet() {
    const provider = await web3Modal.connect();
    addListeners(provider);
    const ethersProvider = new providers.Web3Provider(provider)
    const userAddress = await ethersProvider.getSigner().getAddress()
    setAddress(userAddress)
}
async function addListeners(web3ModalProvider) {
  web3ModalProvider.on("accountsChanged", (accounts) => {
      // window.location.reload()
  });

  // Subscribe to chainId change
  web3ModalProvider.on("chainChanged", () => {
      // window.location.reload()
  });
}
  return (
    <Button onClick={connectWallet}>
      {address ? `Connected: ${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "Connect Wallet"}
    </Button>
  );
};

export default ConnectWalletButton;
