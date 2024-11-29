import { ethers } from 'ethers';
import contractABI from './contractABI.json'; // Import the ABI from a JSON file
import oldContractABI from './oldContractABI.json'; // Import the ABI from a JSON file
import newContractABI from './newContractABI.json'; // Import the ABI from a JSON file
import tokenABI from './tokenABI.json'; // Import the ABI from a JSON file

const contractAddress = '0x9c63af96b60fCA0eB8aA123EEBC8c74306De479b';

export const getContract = (signer) => {
  return new ethers.Contract(contractAddress, contractABI, signer);
};
export const getOldContract = (signer) => {
  return new ethers.Contract('0xf235D078E74581C42fc9B01eD99415795619553c', oldContractABI, signer);
};
export const getNewContract = (signer) => {
  return new ethers.Contract('0x412056129C37e3231d3F9E29DdBDF593b682726B', newContractABI, signer);
};
export const getTokenContract = (contractAddress,signer) => {
  return new ethers.Contract(contractAddress, tokenABI, signer);
};
export default contractAddress;