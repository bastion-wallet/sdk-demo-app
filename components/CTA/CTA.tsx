const CTA = (props: any) => {
  return (
    <button
      {...props}
      className=" flex items-center bg-[#260B2F] rounded-md w-80 my-4 border-[#DE389F] border-2 text-white font-bold px-20 py-4 relative
    before:w-full before:h-full before:scale-x-[1.02] before:scale-y-[1.02]  before:absolute before:top-[50%] before:left-[50%]
    before:-z-10 before:translate-x-[-50%] before:translate-y-[-50%] 
    before:from-[#260B2F] before:to-[#1B0821] before:bg-gradient-to-br
    before:rounded-md  
    hover:bg-[#DE389F] transition-all duration-300"
    >
      {props?.children}
    </button>
  );
};
export default CTA;

//linear-gradient(135deg, #260B2F 0%, #1B0821 100%)
