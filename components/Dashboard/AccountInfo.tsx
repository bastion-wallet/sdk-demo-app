import { useEffect, useState } from "react";

const AccountInfo = ({ bastionConnect, address }: any) => {
  const [smartWalletAddress, setSmartWalletAddress] = useState("");
  const [smartWalletNonce, setSmartWalletNonce] = useState("");
  const [smartWalletBalance, setSmartWalletBalance] = useState("");
  const [smartWalletChainName, setSmartWalletChainName] = useState("");
  const [smartWalletChainID, setSmartWalletChainID] = useState("");

  useEffect(() => {
    const getSmartWalletDetails = async () => {
      try {
        if (bastionConnect) {
          const address = await bastionConnect?.getAddress();
          setSmartWalletAddress(address);
          const signer = await bastionConnect?.getSigner();
          const nonce = await signer?.provider?.getTransactionCount(address);
          setSmartWalletNonce(nonce);
          const balance = await signer?.provider?.getBalance(address);
          setSmartWalletBalance(balance);
          const chainName = await signer?.provider?._network?.name;
          if (chainName) {
            setSmartWalletChainName(chainName);
          }
          const chainId = signer?.provider?._network?.chainId;
          if (chainId) {
            setSmartWalletChainID(chainId);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSmartWalletDetails();
  }, [bastionConnect]);
  return (
    <div className="w-full mr-12">
      <p className="text-[#DE389F] text-lg mb-6">Account Info</p>
      <div>
        <div className="flex justify-between mb-4">
          <p>External Account Address</p>
          <p>{address}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p>Smart Wallet Address</p>
          <p>{smartWalletAddress}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p>Smart Wallet Nonce</p>
          <p>{smartWalletNonce}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p>Smart Wallet Balance</p>
          <p>{smartWalletBalance?.toString()} ETH</p>
        </div>
        <div className="flex justify-between mb-4">
          <p>Chain</p>
          <p>{smartWalletChainName}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p>Chain ID</p>
          <p>{smartWalletChainID}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
