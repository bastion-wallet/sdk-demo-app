import Image from "next/image";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import CTA from "@/components/CTA/CTA";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function Home() {
  return (
    <>
      <Header />
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${poppins.className}`}
      >
        <img
          src="/left-landing.png"
          alt=""
          className="absolute bottom-0 left-0"
        />
        <img
          src="/right-landing.png"
          alt=""
          className="absolute bottom-0 right-0"
        />
        <div className="flex flex-col text-center">
          <h1 className="text-4xl">Sign up using</h1>
          <p className="mb-16">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
            obcaecati.
          </p>
          <div className="flex flex-col items-center">
            <CTA>
              <img src={"/particle.png"} alt="" className="mr-2" />
              <p className="mb-0">Particle Auth</p>
            </CTA>
            <CTA>
              <img src={"/web3auth.png"} alt="" className="mr-2" />

              <p className="mb-0">Web3 Auth</p>
            </CTA>
            <CTA>
              <img src={"/metamask.svg"} alt="" className="mr-2" />
              <p className="mb-0">Metamask</p>
            </CTA>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
