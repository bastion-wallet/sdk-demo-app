import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import React, { useState } from "react";
import { ethers, Contract } from "ethers";
import { Bastion } from "@bastion/sdk";

export default function LoginPage() {
	const bastion = new Bastion({
		apiKey: "your-api-key",
		baseUrl: "https://jsonplaceholder.typicode.com",
	});

	// const liginWithMetamask =

	const loginWithProvider = async (loginProvider: string) => {
		console.log("Inside the function");

		try {
			//Step 1 - set up particle network
			const particle = new ParticleNetwork({
				projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID as string,
				clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY as string,
				appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID as string,
				chainName: "polygon",
				chainId: 80001,
			});
			console.log("Particle: ", particle);
			const userInfo = await particle.auth.login();
			console.log("Logged in user:", userInfo);
			const particleProvider = new ParticleProvider(particle.auth);
			// const ethersProvider = new ethers.providers.Web3Provider(particleProvider, "any");
			// console.log("Logged in user:", await ethersProvider.getSigner().getAddress());

			//Step 2 - Init the bastion signer
			const bastionConnect = await bastion.bastionSigner();
			bastionConnect.init(particleProvider);

			//Step 3 - use it like normal ethers signer / metamask signer
			const contractAddress = "0xEAC57C1413A2308cd03eF3CEa5c9224487825341";
			const contractABI = ["function safeMint(address to) public"];

			const address = await bastionConnect.getAddress();
			const nftContract = new Contract(contractAddress, contractABI, bastionConnect);

			const res = await nftContract.safeMint(address);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="flex flex-col items-center min-h-screen bg-gray-100 py-2">
			<div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md mt-20">
				<div className="flex justify-center items-center">
					<span className="text-gray-700 font-semibold">Login with</span>
				</div>

				<div className="mt-4">
					<button onClick={() => loginWithProvider("Google")} className="py-2 px-4 w-full text-center bg-red-600 rounded-md text-white text-sm hover:bg-red-500">
						Google
					</button>
				</div>

				<div className="mt-4">
					<button onClick={() => loginWithProvider("LinkedIn")} className="py-2 px-4 w-full text-center bg-blue-600 rounded-md text-white text-sm hover:bg-blue-500">
						LinkedIn
					</button>
				</div>

				<div className="mt-4">
					<button onClick={() => loginWithProvider("Facebook")} className="py-2 px-4 w-full text-center bg-blue-400 rounded-md text-white text-sm hover:bg-blue-300">
						Facebook
					</button>
				</div>
			</div>
		</div>
	);
}

