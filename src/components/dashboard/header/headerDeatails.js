import { LuChartNoAxesCombined } from "react-icons/lu";
import { RiSeedlingLine } from "react-icons/ri";
import { IoWallet } from "react-icons/io5";
import { BsArrowRepeat } from "react-icons/bs";
import { ImHome3 } from "react-icons/im";

export const headerDetails = [
  {
    path: "/home",
    icon: ImHome3,
    element: "Home",
  },
  {
    path: "/trending",
    icon: LuChartNoAxesCombined,
    element: "Trending",
  },

  {
    path: "/swap",
    icon: BsArrowRepeat,
    element: "Swap",
  },
  {
    path: "/earn",
    icon: RiSeedlingLine,
    element: "Earn",
  },
];
