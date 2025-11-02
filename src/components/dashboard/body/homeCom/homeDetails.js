// HomeHeader
import { RiGlobalFill } from "react-icons/ri";
import { PiCopySimpleFill } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { RiSettings3Fill } from "react-icons/ri";

export const homeDetails = [
  {
    id: 1,
    icon: RiGlobalFill,
    element: "Filter networks",
  },
  {
    id: 2,
    icon: PiCopySimpleFill,
    path: "/addresses",
    element: "Your addresses",
  },
  {
    id: 3,
    icon: FaSearch,
    path: "/manage-crypto",
    element: "Search",
  },
];

// HomeSubHeader Balance
import { FaArrowsRotate } from "react-icons/fa6";
import { PiHandEyeFill } from "react-icons/pi";
import { LuEyeClosed } from "react-icons/lu";

export const homeSubHeaderDetails = [
  {
    id: 1,
    icon: FaArrowsRotate,
    element: "Refresh",
  },
  {
    id: 2,
    path: "balance",
    icon: PiHandEyeFill,
    element: "Hide Balance",
  },
  {
    id: 3,
    path: "balance",
    icon: LuEyeClosed,
    element: "Show Balance",
  },
];

// HomeSubHeader Nav
import { GoArrowUpRight, GoArrowUp, GoArrowDown } from "react-icons/go";
import { CiBank } from "react-icons/ci";
import { BsArrowRepeat } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi";
import { RiSeedlingLine } from "react-icons/ri";

export const homeSubHeaderNavs = [
  {
    id: 1,
    path: "/send",
    icon: GoArrowUpRight,
    element: "Send",
  },
  {
    id: 2,
    path: "/swap",
    icon: BsArrowRepeat,
    element: "Swap",
  },
  {
    id: 3,
    path: "/fund",
    icon: HiOutlinePlus,
    element: "Fund",
  },
  {
    id: 4,
    path: "/sell",
    icon: CiBank,
    element: "Sell",
  },
  {
    id: 5,
    path: "/earn",
    icon: RiSeedlingLine,
    element: "Earn",
  },
];

// HomeBody Crypto
import Crypto from "./homeBody/homeBodySection/crypto/Crypto";
import Nfts from "./homeBody/homeBodySection/nfts/Nfts";

export const homeBodyCrypto = [
  {
    name: "Crypto",
    component: Crypto,
  },
  {
    name: "NFTs",
    component: Nfts,
  },
];

// Coin Assets
import { PiBankBold } from "react-icons/pi";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { IoIosCard } from "react-icons/io";

export const coinAssets = [
  {
    id: 1,
    path: "/send",
    icon: FaArrowUpLong,
    element: "Send",
  },
  {
    id: 2,
    path: "/receive",
    icon: FaArrowDownLong,
    element: "Receive",
  },
  {
    id: 3,
    path: "/buy",
    icon: IoIosCard,
    element: "Buy",
  },
  {
    id: 4,
    path: "/swap",
    icon: FaArrowsRotate,
    element: "Swap",
  },
  {
    id: 5,
    path: "/sell",
    icon: PiBankBold,
    element: "Sell",
  },
];
