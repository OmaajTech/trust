import React, { useState } from "react";
import { PiCopySimpleFill } from "react-icons/pi";

const CopiedIcon = ({ addressCoins, className }) => {
  const [isCopied, setIsCopied] = useState("");

  const copyAddress = () => {
    navigator.clipboard.writeText(addressCoins);
    setIsCopied("Copied!");
    setTimeout(() => setIsCopied(""), 1000);
  };
  return (
    <>
      <button
        className="text-opacity-70 text-customGray-200"
        onClick={copyAddress}
        onMouseEnter={() => (isCopied ? setIsCopied("") : setIsCopied("Copy"))}
        onMouseLeave={() => {
          setIsCopied("");
        }}
      >
        <PiCopySimpleFill />
      </button>
      {isCopied && <p className={className}>{isCopied}</p>}
    </>
  );
};

export default CopiedIcon;
