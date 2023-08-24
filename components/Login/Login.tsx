import CTA from "../CTA/CTA";

const Login = ({
  loginWithParticleAuth,
  loginWithWeb3Auth,
  loginWithMetamask,
}: any) => {
  return (
    <main
      className={`flex min-h-[calc(100vh-76px)] flex-col items-center justify-between p-24`}
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
          <CTA onClick={loginWithParticleAuth}>
            <img src={"/particle.png"} alt="" className="mr-2" />
            <p className="mb-0">Particle Auth</p>
          </CTA>
          <CTA onClick={loginWithWeb3Auth}>
            <img src={"/web3auth.png"} alt="" className="mr-2" />

            <p className="mb-0">Web3 Auth</p>
          </CTA>
          <CTA onClick={loginWithMetamask}>
            <img src={"/metamask.svg"} alt="" className="mr-2" />
            <p className="mb-0">Metamask</p>
          </CTA>
        </div>
      </div>
    </main>
  );
};

export default Login;
