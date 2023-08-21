const Footer = () => {
  return (
    <footer className=" container rounded-lg my-4 fixed bottom-0 left-2/4 transform -translate-x-2/4 mx-auto w-full">
      <div className="w-full mx-auto p-4 md:py-8">
        <div className="flex items-center justify-between">
          <img src="/logo.png" className="h-8 mr-3" alt="Bastion Logo" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://indorse.io/" className="hover:underline">
              Indorse
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap justify-center items-center">
            <li className="mx-2">
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                <img
                  src={"/twitter.svg"}
                  alt=""
                  height={24}
                  width={24}
                  className="object-contain"
                />
              </a>
            </li>
            <li className="mx-2">
              <a href="#" className="mr-4 hover:underline md:mr-6">
                <img
                  src={"/discord.svg"}
                  alt=""
                  height={24}
                  width={24}
                  className="object-contain"
                />
              </a>
            </li>
            <li className="mx-2">
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                <img
                  src={"/linkedin.svg"}
                  alt=""
                  height={24}
                  width={24}
                  className="object-contain"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
