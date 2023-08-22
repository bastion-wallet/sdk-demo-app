import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import React, { useState } from "react";
import { ethers, Contract } from "ethers";
//@ts-ignore
import { Bastion } from "@bastion-wallet/sdk";

export default function LoginPage() {
  const bastion = new Bastion();
  const [ethersProvider, setEthersProvider] =
    useState<ethers.providers.Web3Provider>();
  const [address, setAddress] = useState<string>();

  const loginWithProvider = async () => {
    console.log("Inside the function");

    try {
      //Step 1 - set up particle network
      const particle = new ParticleNetwork({
        projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID as string,
        clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY as string,
        appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID as string,
        chainName: "arbitrum",
        chainId: 421613,
      });
      console.log("Particle: ", particle);
      const userInfo = await particle.auth.login();
      console.log("Logged in user:", userInfo);
      const particleProvider = new ParticleProvider(particle.auth);

      const tempProvider = new ethers.providers.Web3Provider(
        particleProvider,
        "any"
      );

      setEthersProvider(tempProvider);
      setAddress(await tempProvider.getSigner().getAddress());
      console.log(await tempProvider.getSigner().getAddress());
    } catch (e) {
      console.error(e);
    }
  };

  const mintNFT = async () => {
    try {
      //Step 2 - Init the bastion signer
      const bastionConnect = await bastion.bastionConnect;
      // const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL1);
      // ethersProvider = new ethers.providers.Web3Provider(provider, "any");
      // Note: need to add option here
      // @ts-ignore
      bastionConnect.init(ethersProvider, {
        privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY as string,
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL1 as string,
        chainId: 80001,
      });
      console.log(bastionConnect, "bastionConnect");

      //Step 3 - use it like normal ethers signer / metamask signer
      const contractAddress = "0xEAC57C1413A2308cd03eF3CEa5c9224487825341";
      const contractABI = ["function safeMint(address to) public"];

      const address = await bastionConnect.getAddress();
      const nftContract = new Contract(
        contractAddress,
        contractABI,
        bastionConnect
      );

      const res = await nftContract.safeMint(
        "0x2429EB38cB9b456160937e11aefc80879a2d2712"
      );
      console.log("res", res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-2">
      <div className="p-6 max-w-lg w-full bg-white shadow-md rounded-md mt-20">
        <div className="flex justify-center items-center">
          <span className="text-gray-700 font-semibold">Login with</span>
        </div>
        {ethersProvider ? (
          <div className="mt-4">
            Hello {address}
            <button
              onClick={() => mintNFT()}
              className="py-2 px-4 mt-4 w-full text-center bg-red-600 rounded-md text-white text-sm hover:bg-red-500"
            >
              Mint NFT
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <button
              onClick={() => loginWithProvider()}
              className="py-2 px-4 w-full text-center bg-red-600 rounded-md text-white text-sm hover:bg-red-500"
            >
              Particle Auth
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
