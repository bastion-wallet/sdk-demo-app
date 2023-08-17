const Dashboard = ({ address }: any) => {
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
      <div>
        <p>{address}</p>
      </div>
    </main>
  );
};

export default Dashboard;
