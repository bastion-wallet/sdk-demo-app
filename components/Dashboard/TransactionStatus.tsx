const TransactionStatus = ({ userOpHash, userAction }: any) => {
  if (!userOpHash) return <div className="w-full ml-12"></div>;
  return (
    <div className="w-full ml-12">
      <p className="text-[#DE389F] text-lg mb-6">Demo Results</p>
      {userAction ? (
        <div className="flex justify-between mb-4">
          <p>Action</p>
          <p>Minting NFT</p>
        </div>
      ) : null}
      {userOpHash ? (
        <div className="flex justify-between mb-4 truncate">
          <p>UserOp Hash: </p>
          <a
            href={`https://www.jiffyscan.xyz/userOpHash/${userOpHash}?network=arbitrum-goerli`}
            target="_blank"
            rel="noreferrer"
            className="truncate"
          >
            <p className="truncate underline">{userOpHash}</p>
          </a>
        </div>
      ) : null}
      {/* <div className="flex justify-between mb-4">
        <p>Txn Hash</p>
        <p>0x1234</p>
      </div>
      <div className="flex justify-between mb-4">
        <p>Status</p>
        <p>Successful</p>
      </div> */}
    </div>
  );
};

export default TransactionStatus;
