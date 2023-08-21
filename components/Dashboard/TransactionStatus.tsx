const TransactionStatus = () => {
  return (
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
  );
};

export default TransactionStatus;
