import Spinner from "../Spinner/Spinner";

const TransactionStatus = ({ userOpHash, userAction, txnLoading }: any) => {
  if (txnLoading)
    return (
      <div className="w-full ml-12">
        <p className="text-[#DE389F] text-lg mb-6">Demo Results</p>
        {userAction ? (
          <div className="flex justify-between mb-4">
            <p>Action</p>
            <p>{userAction}</p>
          </div>
        ) : null}
        <div className="w-full flex justify-center">
          <Spinner />
        </div>
      </div>
    );
  if (!userOpHash) return <div className="w-full ml-12"></div>;
  return (
    <div className="w-full ml-12">
      <p className="text-[#DE389F] text-lg mb-6">Demo Results</p>
      {userAction ? (
        <div className="flex justify-between mb-4">
          <p>Action</p>
          <p>{userAction}</p>
        </div>
      ) : null}
      {userOpHash ? (
        <div className="flex justify-between mb-4 overflow-hidden truncate">
          <p>UserOp Hash: </p>
          <a
            href={`https://www.jiffyscan.xyz/userOpHash/${userOpHash}?network=arbitrum-goerli`}
            target="_blank"
            rel="noreferrer"
            className="truncate block overflow-hidden"
          >
            <p className="truncate block underline w-20">{userOpHash}</p>
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
