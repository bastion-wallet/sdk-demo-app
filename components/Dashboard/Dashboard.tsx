import { ethers, Contract } from "ethers";
import { useEffect, useState } from "react";
import AccountInfo from "./AccountInfo";
import TransactionStatus from "./TransactionStatus";

const Dashboard = ({ address, ethersProvider, bastionConnect }: any) => {
  console.log(ethersProvider, "ETHERS PROVIDER");
  console.log(bastionConnect, "BASTION CONNECT");
  const [userOpHash, setUserOpHash] = useState("");

  const mintNFT = async () => {
    console.log("clicked, passed address", address);
    const signer = await bastionConnect.getSigner();

    console.log(signer, "bastionConnect signer");
    try {
      //Step 3 - use it like normal ethers signer / metamask signer
      const contractAddress = "0xEAC57C1413A2308cd03eF3CEa5c9224487825341";
      const contractABI = ["function safeMint(address to) public"];

      const nftContract = new Contract(
        contractAddress,
        contractABI,
        bastionConnect
      );

      const res = await nftContract.safeMint(address);
      console.log("res", res);
      setUserOpHash(res?.hash);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main
      className={`flex min-h-[calc(100vh-76px)] flex-col items-center justify-between p-24`}
    >
      <img
        src="/left-landing.png"
        alt=""
        className="absolute bottom-0 left-0 -z-10"
      />
      <img
        src="/right-landing.png"
        alt=""
        className="absolute bottom-0 right-0 -z-10"
      />
      <div className="rounded-2xl bg-gradient-to-r from-[#6C1EB0] to-[#DE389F] p-1 min-w-full max-w-screen-lg">
        <div className="rounded-2xl bg-gradient-to-b p-10 from-[#260B2F] to-[#1B0821] min-w-full max-w-screen-lg">
          <div className="w-full flex container justify-between items-center">
            <AccountInfo bastionConnect={bastionConnect} address={address} />
            <div className="w-0.5 h-60 bg-gray-600"></div>
            <TransactionStatus userOpHash={userOpHash} />
          </div>
          <hr className="my-16 h-0.5 border-gray-600" />
          <div className="w-full flex container justify-between items-center h-32">
            <button
              className="w-full rounded-2 bg-gradient-to-r from-[#6C1EB0] to-[#DE389F] mx-4 px-10 py-4 h-full rounded-3xl"
              onClick={() => mintNFT()}
            >
              Mint NFT
            </button>
            <button className="w-full rounded-2 bg-gradient-to-r from-[#6C1EB0] to-[#DE389F] mx-4 px-10 py-4 h-full rounded-3xl">
              Mint LINK ERC20
            </button>
            <button className="w-full rounded-2 bg-gradient-to-r from-[#6C1EB0] to-[#DE389F] mx-4 px-10 py-4 h-full rounded-3xl">
              Send ETH
            </button>
            <button className="w-full rounded-2 bg-gradient-to-r from-[#6C1EB0] to-[#DE389F] mx-4 px-10 py-4 h-full rounded-3xl">
              Approve and Transfer From NFT
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
