import { IoIosCard } from "react-icons/io";
import { TbArrowsExchange } from "react-icons/tb";
import { IoQrCode } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";

export const fundDetails = [
  {
    id: 1,
    icon: IoIosCard,
    title: "Buy crypto",
    info: "With a card, bank transfer or provider",
    path: "/buy",
  },
  {
    id: 2,
    icon: TbArrowsExchange,
    title: "Deposit from an exchange",
    info: "Move funds from Binance, Coinbase",
    path: "/receive",
  },
  {
    id: 3,
    icon: IoQrCode,
    title: "Receive from another wallet",
    info: "View QR codes and wallet addresses",
    path: "/receive",
  },
  {
    id: 4,
    icon: FaUserGroup,
    title: "Buy locally",
    info: "Buy directly from users near you",
    path: "/buy",
  },
];
