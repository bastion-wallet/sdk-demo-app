import Image from "next/image";
import { Poppins } from "next/font/google";
//COMPONENTS
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Login from "@/components/Login/Login";
import Dashboard from "@/components/Dashboard/Dashboard";

import { ParticleNetwork } from "@particle-network/auth";
import { ethers, Contract } from "ethers";
import { Bastion } from "../sdk/src";
import { useState } from "react";
import { ParticleProvider } from "@particle-network/provider";
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function Home() {
  const bastion = new Bastion();
  const [ethersProvider, setEthersProvider] =
    useState<ethers.providers.Web3Provider>();
  const [address, setAddress] = useState<string>();

  const loginWithParticleAuth = async () => {
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
  console.log(address);
  return (
    <div className={`${poppins.className}`}>
      <Header />
      {address ? (
        <Dashboard address={address} />
      ) : (
        <Login loginWithParticleAuth={loginWithParticleAuth} />
      )}
      <Footer />
    </div>
  );
}
