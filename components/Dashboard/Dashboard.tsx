import { ethers, Contract } from "ethers";

const Dashboard = ({ address, ethersProvider, bastionConnect }: any) => {
  console.log(ethersProvider, "ETHERS PROVIDER");
  console.log(bastionConnect, "BASTION CONNECT");
  const mintNFT = async () => {
    console.log("clicked");
    try {
      //Step 3 - use it like normal ethers signer / metamask signer
      const contractAddress = "0xEAC57C1413A2308cd03eF3CEa5c9224487825341";
      const contractABI = ["function safeMint(address to) public"];

      const nftContract = new Contract(
        contractAddress,
        contractABI,
        bastionConnect
      );

      const res = await nftContract.safeMint(
        "0x2429EB38cB9b456160937e11aefc80879a2d2712"
      );
      console.log("res", res);
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
            <div className="w-full mr-12">
              <p className="text-[#DE389F] text-lg mb-6">Account Info</p>
              <div>
                <div className="flex justify-between mb-4">
                  <p>External Account Address</p>
                  <p>{address}</p>
                </div>
                <div className="flex justify-between mb-4">
                  <p>Smart Wallet Address</p>
                  <p>0x1234</p>
                </div>
                <div className="flex justify-between mb-4">
                  <p>Smart Wallet Nonce</p>
                  <p>2</p>
                </div>
                <div className="flex justify-between mb-4">
                  <p>Smart Wallet Balance</p>
                  <p>0.01 ETH</p>
                </div>
                <div className="flex justify-between mb-4">
                  <p>Chain</p>
                  <p>Arbitrum Goerli</p>
                </div>
              </div>
            </div>
            <div className="absolute left-1/2 -ml-0.5 w-0.5 h-40 mr-12 bg-gray-600"></div>
            <div className="w-full ml-12">
              <p className="text-[#DE389F] text-lg mb-6">Demo Results</p>
              <div className="flex justify-between mb-4">
                <p>Action</p>
                <p>Minting NFT</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>UserOp Hash</p>
                <p>0x1234</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Txn Hash</p>
                <p>0x1234</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Status</p>
                <p>Successful</p>
              </div>
            </div>
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
