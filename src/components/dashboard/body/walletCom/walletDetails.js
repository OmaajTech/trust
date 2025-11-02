import AccountInfo from "./walletInfo/AccountInfo";
import WalletPhrase from "./walletInfo/WalletPhrase";

export const walletDetails = [
  {
    id: 1,
    label: "Accounts",
    component: AccountInfo,
  },
  {
    id: 2,
    label: "Secret Phrase",
    component: WalletPhrase,
  },
];
