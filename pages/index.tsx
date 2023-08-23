import Image from "next/image";
import { Poppins } from "next/font/google";
//COMPONENTS
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Login from "@/components/Login/Login";
import Dashboard from "@/components/Dashboard/Dashboard";

import { ParticleNetwork } from "@particle-network/auth";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, CONNECTED_EVENT_DATA } from "@web3auth/base";
import { ADAPTER_EVENTS } from "@web3auth/base";

import { ethers, Contract } from "ethers";
//@ts-ignore
import { Bastion } from "bastion-wallet-sdk";
import { useState } from "react";
import { ParticleProvider } from "@particle-network/provider";
import Head from "next/head";
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function Home() {
  const bastion = new Bastion();
  const [ethersProvider, setEthersProvider] =
    useState<ethers.providers.Web3Provider>();
  const [address, setAddress] = useState<string>("");
  const [bastionConnect, setBastionConnect] = useState<any>();

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
      const res = await connectBastionWallet(tempProvider);
    } catch (e) {
      console.error(e);
    }
  };

  const loginWithWeb3Auth = async () => {
    try {
      const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "";
      //Initialize within your constructor
      const web3auth = new Web3Auth({
        clientId,
        // "", // Get your Client ID from Web3Auth Dashboard
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x66eed", // Please use 0x5 for Goerli Testnet
          rpcTarget: "https://rpc.goerli.arbitrum.gateway.fm",
        },
      });
      await subscribeAuthEvents(web3auth);
      await web3auth.initModal();
      const web3authProvider = await web3auth.connect();
      await web3auth.getUserInfo();
      console.log(web3auth.provider, "rpivder");
      if (web3authProvider) {
        const tempProvider = new ethers.providers.Web3Provider(
          web3authProvider,
          "any"
        );

        setEthersProvider(tempProvider);
        await connectBastionWallet(tempProvider);
        setAddress(await tempProvider.getSigner().getAddress());
      }
    } catch (error) {
      console.log(error);
    }
  };

  // subscribe to lifecycle events emitted by web3auth
  const subscribeAuthEvents = (web3auth: Web3Auth) => {
    web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: CONNECTED_EVENT_DATA) => {
      console.log("connected to wallet", data);
      // web3auth.provider will be available here after user is connected
    });
    web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
      console.log("connecting");
    });
    web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
      console.log("disconnected");
    });
    web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
      console.log("error", error);
    });
    web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
      console.log("error", error);
    });
  };

  const connectBastionWallet = async (tempProvider: any) => {
    try {
      const bastionConnect = await bastion.bastionConnect;
      //@ts-ignore
      await bastionConnect.init(tempProvider, {
        privateKey: "",
        rpcUrl: "",
        chainId: 421613,
      });
      setBastionConnect(bastionConnect);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${poppins.className}`}>
      <Head>
        <title>Bastion Wallet | Demo Application</title>
      </Head>
      <Header />
      {address ? (
        <Dashboard
          address={address}
          ethersProvider={ethersProvider}
          bastionConnect={bastionConnect}
        />
      ) : (
        <Login
          loginWithParticleAuth={loginWithParticleAuth}
          loginWithWeb3Auth={loginWithWeb3Auth}
        />
      )}
      <Footer />
    </div>
  );
}
