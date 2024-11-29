// src/components/Admin.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "../contexts/Web3Context";
import contractAddress, { getContract, getNewContract, getOldContract, getTokenContract } from "../contract";
import styled, { css } from "styled-components";
import ConnectWalletButton from "./ConnectWalletButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 15px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 10px;
  }
`;

const Section = styled.div`
  margin: 20px 0;
  width: 100%;

  h2 {
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  input {
    width: calc(100% - 22px);
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding: 8px;
      font-size: 0.9rem;
    }
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding: 8px;
      font-size: 0.9rem;
    }

    ${(props) =>
    props.paused &&
    css`
        background-color: red;

        &:hover {
          background-color: darkred;
        }
      `}
  }
`;

const Admin = () => {
  const { signer } = useWeb3();
  const [transactionFee, setTransactionFee] = useState("");
  const [SwapCodeFee, setSwapCodeFee] = useState("");
  const [GweiFee, setGweiFee] = useState("");
  const [usdtAmount, setusdtAmount] = useState("");
  const [tokenAmount, settokenAmount] = useState("");
  const [opensource, setOpensource] = useState("");
  const [volumeLimit, setVolumeLimit] = useState("");
  const [transactionLimit, setTransactionLimit] = useState("");
  const [percentage, setPercentage] = useState("");
  const [whitelistUsers, setWhitelistUsers] = useState([]);
  const [dailyVolumes, setDailyVolumes] = useState([]);
  const [dailyTransactions, setDailyTransactions] = useState([]);
  const [dailyPercentages, setDailyPercentages] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [onyWhiteList, setonyWhiteList] = useState(false);
  const [owner, setOwner] = useState("")
  const [newOwner, setNewOwner] = useState("")
  const [removeAddress, setRemoveAddress] = useState("");
  const [removeAmount, setRemoveAmount] = useState("");
  const [tokenContract, setTokenContract] = useState("");
  const [tokenRemoveAmount, setTokenRemoveAmount] = useState("");
  useEffect(() => {
    const fetchTradingStatus = async () => {
      if (signer) {
        const contract = getContract(signer);
        const paused = await contract.Abstruct();
        console.log(paused);
        setIsPaused(paused);
      }
    };
    const fetchonyWhiteListStatus = async () => {
      if (signer) {
        const contract = getContract(signer);
        const paused = await contract.onyWhiteList();
        console.log(paused);
        setonyWhiteList(paused);
      }
    };
    const fetchOwner = async () => {
      if (signer) {
        const contract = getContract(signer);
        const Owner = await contract.Owner();
        console.log(Owner);
        setOwner(Owner);
      }
    };
    fetchOwner()
    fetchTradingStatus();
    fetchonyWhiteListStatus()
  }, [signer]);

  const handleAlternateEncryption = async () => {
    try {
      if (signer) {
        const contract = getContract(signer);
        await contract.AlternateEncryption(ethers.utils.parseUnits(transactionFee, 0));
        alert("Transaction fee set successfully");
      }
    } catch (error) {
      alert(`Failed to set transaction fee: ${error.message}`);
    }
  };
  const handleSwapCode = async () => {
    try {
      if (signer) {
        const contract = getContract(signer);
        await contract.AlternateEncryption(ethers.utils.parseUnits(SwapCodeFee, 0));
        alert("Transaction fee set successfully");
      }
    } catch (error) {
      alert(`Failed to set transaction fee: ${error.message}`);
    }
  };
  const handleGwei = async () => {
    try {
      if (signer) {
        const contract = getContract(signer);
        await contract.Gwei(GweiFee);
        alert("Transaction fee set successfully");
      }
    } catch (error) {
      alert(`Failed to set transaction fee: ${error.message}`);
    }
  };
  const handleAddOpenSource = async () => {
    try {
      if (signer) {
        const contract = getContract(signer);
        await contract.addOpenSource(opensource);
        alert("Added successfully");
      }
    } catch (error) {
      alert(`Failed to add: ${error.message}`);
    }
  };
  const handlealteration = async () => {
    try {
      if (signer) {
        const contract = getContract(signer);
        await contract.alteration(newOwner);
        alert("Changed successfully");
      }
    } catch (error) {
      alert(`Failed to change: ${error.message}`);
    }
  };
  const handleRemoveOpenSource = async () => {
    try {
      if (signer) {
        const contract = getContract(signer);
        await contract.removeOpenSource(opensource);
        alert("Removed successfully");
      }
    } catch (error) {
      alert(`Failed to remove: ${error.message}`);
    }
  };

  const handleSetDailyLimits = async () => {
    try {
      if (signer) {
        const contract = getContract(signer);
        await contract.setSystemDailyLimits(
          ethers.utils.parseUnits(volumeLimit, 0),
          ethers.utils.parseUnits(transactionLimit, 0),
          ethers.utils.parseUnits(percentage, 0)
        );
        alert("Daily limits set successfully");
      }
    } catch (error) {
      alert(`Failed to set daily limits: ${error.message}`);
    }
  };

  const handleCreatePool = async () => {
    try {
      if (signer) {
        const usdtInstance = getTokenContract("0xc2132D05D31c914a87C6611C10748AEb04B58e8F", signer);
        await usdtInstance.approve(contractAddress, ethers.utils.parseUnits(usdtAmount, 6));
        const tokenInstance = getTokenContract("0x96F0a7167ab7ba6e59FfB68707C9d1B049524B0F", signer);
        await tokenInstance.approve(contractAddress, ethers.utils.parseUnits(usdtAmount, 18));
        const contract = getContract(signer);
        await contract.CreatePool(
          ethers.utils.parseUnits(usdtAmount, 6),
          ethers.utils.parseUnits(tokenAmount, 18),
        );
        alert("Pool Created successfully");
      }
    } catch (error) {
      alert(`Failed to Create Pool: ${error.message}`);
    }
  };

  const handlePauseTrading = async () => {
    try {
      if (signer) {
        const contract = getContract(signer);
        await contract.pauseTrading();
        const paused = await contract.tradingPaused();
        setIsPaused(paused);
        alert("Trading paused successfully");
      }
    } catch (error) {
      alert(`Failed to pause trading: ${error.message}`);
    }
  };
  function formatBigInt(value) {
    return value.toString();
}
  const handleAbstruct = async () => {
    try {
      if (signer) {
        const array = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123];

for await (const user of array) {
  
        try {
            const oldContract = getOldContract(signer);
            const userData = await oldContract.userList(user);
            console.log(userData)
            const stakes = await oldContract.getUserStakes(userData);
            const formattedStakes = stakes.map(stake => ({
              stakedUSDT: formatBigInt(stake.stakedUSDT),
              stakedToken: formatBigInt(stake.stakedToken),
              startTime: formatBigInt(stake.startTime),
              endTime: formatBigInt(stake.endTime),
              duration: formatBigInt(stake.duration),
              lastClaimedTime: formatBigInt(stake.lastClaimedTime),
              paid: formatBigInt(stake.paid)
          }));
          const newContract = getNewContract(signer)
          console.log(`Formatted stakes: ${JSON.stringify(formattedStakes)}`);
      
          // Store the user data in the new contract
          const tx = await newContract.storeUserData(userData, formattedStakes);
          console.log(`Transaction hash: ${tx.hash}`);
    
          // Wait for the transaction to be mined
          await tx.wait();
          console.log(`Data stored for user ${userData}`);
            alert(`Data stored for user ${userData}`);
        } catch (error) {
          console.log(error)
        }
}
      }
    } catch (error) {
      console.log(error)
      alert(`Failed to pause trading: ${error.message}`);
    }
  };
  const handleConstructer = async () => {
    try {
      if (signer) {
        const contract = getContract(signer);
        await contract.Constructer();
        const paused = await contract.Abstruct();
        setIsPaused(paused);
        alert("Trading paused successfully");
      }
    } catch (error) {
      alert(`Failed to pause trading: ${error.message}`);
    }
  };
  const handleListToken = async () => {
    try {
      if (signer) {
        const contract = getContract(signer);
        await contract.ListToken();
        const paused = await contract.onyWhiteList();
        setonyWhiteList(paused);
        alert("Trading paused successfully");
      }
    } catch (error) {
      alert(`Failed to pause trading: ${error.message}`);
    }
  };
  const handleUnlistToken = async () => {
    try {
      if (signer) {
        const contract = getContract(signer);
        await contract.onyWhiteList();
        const paused = await contract.Abstruct();
        setonyWhiteList(paused);
        alert("Trading paused successfully");
      }
    } catch (error) {
      alert(`Failed to pause trading: ${error.message}`);
    }
  };

  const handleDoLimitedTrade = async () => {
    try {
      if (signer) {
        const contract = getContract(signer);
        await contract.doLimitedTrade();
        alert("Limited trading enabled successfully");
      }
    } catch (error) {
      alert(`Failed to enable limited trading: ${error.message}`);
    }
  };

  const handleOnWhiteListOnly = async () => {
    try {
      if (signer) {
        const contract = getContract(signer);
        await contract.onWhiteListOnly();
        alert("Whitelist only enabled successfully");
      }
    } catch (error) {
      alert(`Failed to enable whitelist only: ${error.message}`);
    }
  };

  const handleWhitelistUsers = async () => {
    try {
      if (signer) {
        const contract = getContract(signer);
        await contract.whiteListUser(
          whitelistUsers,
          dailyVolumes.map(vol => ethers.utils.parseUnits(vol, 0)),
          dailyTransactions.map(tx => ethers.utils.parseUnits(tx, 0)),
          dailyPercentages.map(pct => ethers.utils.parseUnits(pct, 0))
        );
        alert("Users whitelisted successfully");
      }
    } catch (error) {
      alert(`Failed to whitelist users: ${error.message}`);
    }
  };
  const handleRemovePair = async () => {
    try {
      if (signer) {
        const contract = getContract(signer);
        await contract.removePair(removeAddress, ethers.utils.parseUnits(removeAmount, 18));
        alert("BNB removed successfully");
      }
    } catch (error) {
      alert(`Failed to remove BNB: ${error.message}`);
    }
  };

  const handleRemoveToken = async () => {
    try {
      if (signer) {
        const contract = getContract(signer);
        await contract.removeToken(tokenContract, ethers.utils.parseUnits(tokenRemoveAmount, 18));
        alert("Token removed successfully");
      }
    } catch (error) {
      alert(`Failed to remove token: ${error.message}`);
    }
  };
  return (
    <Container>
      <h1>Admin Panel</h1>
      <ConnectWalletButton />
      <Section>
        {!isPaused ? <>
          <h2>Abstruct</h2>
          <button onClick={handleAbstruct} paused={isPaused}>Abstruct</button>
        </> : <>
          <h2>Constructer</h2>
          <button onClick={handleConstructer} paused={isPaused}>Constructer</button>
        </>}
      </Section>
      <Section>
        {onyWhiteList ? <>
          <h2>Unlist Token</h2>
          <button onClick={handleUnlistToken} paused={isPaused}>Unlist</button>
        </> : <>
          <h2>List Token</h2>
          <button onClick={handleListToken} paused={isPaused}>List</button>
        </>}
      </Section>
      <Section>
        <h2>Opensource</h2>
        <input
          type="text"
          value={opensource}
          onChange={(e) => setOpensource(e.target.value)}
          placeholder="Opensource (address)"
        />
        <button onClick={handleAddOpenSource}>Add</button>
        <button style={{ marginTop: '10px' }} onClick={handleRemoveOpenSource}>Remove</button>
      </Section>
      <Section>
        <h2>Alteration</h2>
        <h5>Owner Address : {owner}</h5>
        <input
          type="text"
          value={newOwner}
          onChange={(e) => setNewOwner(e.target.value)}
          placeholder="Owner (address)"
        />
        <button onClick={handlealteration}>Change</button>
        {/* <button style={{marginTop:'10px'}} onClick={handleRemoveOpenSource}>Remove</button> */}
      </Section>
      <Section>
        <h2>Alternate Encryption</h2>
        <input
          type="text"
          value={transactionFee}
          onChange={(e) => setTransactionFee(e.target.value)}
          placeholder="Transaction Fee (in basis points)"
        />
        <button onClick={handleAlternateEncryption}>Set Fee</button>
      </Section>
      <Section>
        <h2>Swap Code</h2>
        <input
          type="text"
          value={SwapCodeFee}
          onChange={(e) => setSwapCodeFee(e.target.value)}
          placeholder="Transaction Fee (in basis points)"
        />
        <button onClick={handleSwapCode}>Set Fee</button>
      </Section>
      <Section>
        <h2>Gwei</h2>
        <input
          type="text"
          value={GweiFee}
          onChange={(e) => setGweiFee(e.target.value)}
          placeholder="Transaction Fee (in basis points)"
        />
        <button onClick={handleGwei}>Set Fee</button>
      </Section>
      <Section>
        <h2>Create Pool</h2>
        <input
          type="text"
          value={usdtAmount}
          onChange={(e) => setusdtAmount(e.target.value)}
          placeholder="USDT Amount"
        />
        <input
          type="text"
          value={tokenAmount}
          onChange={(e) => settokenAmount(e.target.value)}
          placeholder="Token Amount"
        />

        <button onClick={handleCreatePool}>Create Pool</button>
      </Section>
      <Section>
        <h2>Remove Pair (Matic)</h2>
        <input
          type="text"
          value={removeAddress}
          onChange={(e) => setRemoveAddress(e.target.value)}
          placeholder="Recipient Address"
        />
        <input
          type="text"
          value={removeAmount}
          onChange={(e) => setRemoveAmount(e.target.value)}
          placeholder="Amount"
        />
        <button onClick={handleRemovePair}>Remove Pair</button>
      </Section>
      <Section>
        <h2>Remove Token (ERC20)</h2>
        <input
          type="text"
          value={tokenContract}
          onChange={(e) => setTokenContract(e.target.value)}
          placeholder="Token Contract Address"
        />
        <input
          type="text"
          value={tokenRemoveAmount}
          onChange={(e) => setTokenRemoveAmount(e.target.value)}
          placeholder="Amount"
        />
        <button onClick={handleRemoveToken}>Remove Token</button>
      </Section>
      {/* <Section>
        <h2>Set Daily Limits</h2>
        <input
          type="text"
          value={volumeLimit}
          onChange={(e) => setVolumeLimit(e.target.value)}
          placeholder="Volume Limit"
        />
        <input
          type="text"
          value={transactionLimit}
          onChange={(e) => setTransactionLimit(e.target.value)}
          placeholder="Transaction Limit"
        />
        <input
          type="text"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          placeholder="Percentage"
        />
        <button onClick={handleSetDailyLimits}>Set Limits</button>
      </Section>
      <Section>
        <h2>Pause Trading</h2>
        <button onClick={handlePauseTrading} paused={isPaused}>Pause</button>
      </Section>
      <Section>
        <h2>Enable Limited Trading</h2>
        <button onClick={handleDoLimitedTrade}>Enable</button>
      </Section>
      <Section>
        <h2>Enable Whitelist Only</h2>
        <button onClick={handleOnWhiteListOnly}>Enable</button>
      </Section>
      <Section>
        <h2>Whitelist Users</h2>
        <input
          type="text"
          value={whitelistUsers.join(",")}
          onChange={(e) => setWhitelistUsers(e.target.value.split(","))}
          placeholder="Users (comma separated)"
        />
        <input
          type="text"
          value={dailyVolumes.join(",")}
          onChange={(e) => setDailyVolumes(e.target.value.split(","))}
          placeholder="Daily Volumes (comma separated)"
        />
        <input
          type="text"
          value={dailyTransactions.join(",")}
          onChange={(e) => setDailyTransactions(e.target.value.split(","))}
          placeholder="Daily Transactions (comma separated)"
        />
        <input
          type="text"
          value={dailyPercentages.join(",")}
          onChange={(e) => setDailyPercentages(e.target.value.split(","))}
          placeholder="Daily Percentages (comma separated)"
        />
        <button onClick={handleWhitelistUsers}>Whitelist Users</button>
      </Section> */}
    </Container>
  );
};

export default Admin;
