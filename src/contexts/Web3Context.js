import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers, providers } from 'ethers'; // Correctly import ethers and providers

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const web3Provider = new providers.Web3Provider(window.ethereum);
                setProvider(web3Provider);

                const userSigner = web3Provider.getSigner();
                setSigner(userSigner);

                const userAddress = await userSigner.getAddress();
                setAccount(userAddress);
            }
        };
        init();
    }, []);

    return (
        <Web3Context.Provider value={{ provider, signer, account }}>
            {children}
        </Web3Context.Provider>
    );
};
