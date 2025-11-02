import { Link } from "react-router-dom";
import NftImg from "../../../../../../../assets/home/nft.svg";

const Nfts = () => {
  return (
    <div className="flex items-center justify-center">
      <div>
        <div className="flex justify-center mb-2">
          <div className="w-[97px] flex justify-center">
            <img src={NftImg} alt="" className="object-cover rounded-none" />
          </div>
        </div>
        <h2 className="text-xl font-bold tracking-wider">No NFTs bought</h2>
        <div className="w-full allFlex2">
          <button className="p-3 mt-2 font-bold text-white rounded-full bg-customBlue-100">
            <Link to="/receive">Receive</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nfts;
