import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Layouts from "./Layouts";
import Home from "../../../../pages/home/Home";
import Earn from "../../../../pages/earn/Earn";
import Swap from "../../../../pages/swap/Swap";
import History from "../../../../pages/history/History";
import Settings from "../../../../pages/settings/Settings";
import Addresses from "../../../../pages/home/Addresses";
import ManageCrypto from "../../../../pages/home/ManageCrypto";
import Trending from "../../../../pages/trending/Trending";
import Send from "../../../../pages/home/Send";
import Fund from "../../../../pages/home/Fund";
import Sell from "../../../../pages/home/Sell";
import Assets from "../../../../pages/home/Assets";
import SendCoinCom from "../../body/sendCom/SendCoinCom";
import Received from "../../../../pages/home/Received";
import ReceivedCoinCom from "../../body/receivedCom/ReceivedCoinCom";
import Buy from "../../../../pages/home/Buy";
import BuyCoinCom from "../../body/buyCom/BuyCoinCom";
import SwapCoinCom from "../../body/swapCom/SwapCoinCom";
import SellCoinCom from "../../body/sellCom/SellCoinCom";
import Exchange from "../../../../pages/exchange/Exchange";
import Transfer from "../../../../pages/transfer/Transfer";
import HistoryCoinCom from "../../body/historyCom/HistoryCoinCom";
import EarnCoin from "../../body/earnCom/earnCoin/EarnCoin";
import MinerConversion from "../../body/earnCom/earnCoin/MinerConversion";
import EarnCoinForm from "../../body/earnCom/earnCoin/EarnCoinForm";
import RequireAuth from "../../../auth/redirection/RequireAuth";
import RedirectAuth from "../../../auth/redirection/RedirectAuth";
import Login from "../../../../pages/registration/Login";
import Register from "../../../../pages/registration/Register";
import AdminDashboard from "../../../auth/adminRole/AdminDashboard";
import AdminUserHistory from "../../../auth/adminRole/AdminUserHistory";
import AdminEarnButton from "../../../auth/adminRole/AdminEarnButton";
import SingleUserDashboard from "../../../auth/adminRole/singleUser/SingleUserDashboard";
import UsersInfo from "../../../auth/adminRole/singleUser/UsersInfo";
import AdminMiningActivated from "../../../auth/adminRole/AdminMiningActivated";
import Wallet from "../../../../pages/wallet/Wallet";
import WalletInfo from "../../body/walletCom/walletInfo/WalletInfo";
import BackUpPhrase from "../../body/homeCom/BackUpPhrase";
import RedirectBackUp from "../../../auth/redirection/RedirectBackUp";
import VerifyKeyPhrase from "../../../auth/registrationCom/VerifyKeyPhrase";
import RedirectVerify from "../../../auth/redirection/RedirectVerify";
import NotFound from "../../../../pages/notFound/NotFound";
import AdminReceiverCoinCom from "../../body/adminReceiverCom/adminReceiverCoinCom";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RedirectAuth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<RedirectVerify />}>
        <Route path="/import-wallet" element={<VerifyKeyPhrase />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route element={<RedirectBackUp />}>
            <Route path="backup-phrase" element={<BackUpPhrase />} />
          </Route>
          <Route path="addresses" element={<Addresses />} />
          <Route path="manage-crypto" element={<ManageCrypto />} />
          <Route path="trending" element={<Trending />} />
          <Route path="fund" element={<Fund />} />
          <Route path="setting" element={<Settings />} />
          <Route path="exchange" element={<Exchange />} />

          {/* Admin */}
          <Route path="admin-list">
            <Route index element={<AdminDashboard />} />
            <Route path="singleUser/:userId" element={<SingleUserDashboard />}>
              <Route index element={<UsersInfo />} />
              <Route path="deposit" element={<AdminReceiverCoinCom />} />
              <Route path="history" element={<AdminUserHistory />} />
              <Route
                path="mining-activated"
                element={<AdminMiningActivated />}
              />
              <Route path="earn" element={<AdminEarnButton />} />
              <Route path="deposit-mining-fee" element={<EarnCoinForm />} />
            </Route>
          </Route>

          {/* Send */}
          <Route path="send">
            <Route index element={<Send />} />
            <Route path=":coinslug" element={<SendCoinCom />} />
          </Route>

          {/* Received */}
          <Route path="receive">
            <Route index element={<Received />} />
            <Route path=":coinslug" element={<ReceivedCoinCom />} />
          </Route>

          {/* Buy */}
          <Route path="buy">
            <Route index element={<Buy />} />
            <Route path=":coinslug" element={<BuyCoinCom />} />
          </Route>

          {/* Swap */}
          <Route path="swap">
            <Route index element={<Swap />} />
            <Route path=":coinslug" element={<SwapCoinCom />} />
          </Route>

          {/* Sell */}
          <Route path="sell">
            <Route index element={<Sell />} />
            <Route path=":coinslug" element={<SellCoinCom />} />
          </Route>

          {/* Assets */}
          <Route path="assets">
            <Route path=":coinslug" element={<Assets />} />
          </Route>

          {/* Transfer */}
          <Route path="transfer">
            <Route path=":transferId" element={<Transfer />} />
          </Route>

          {/* History */}
          <Route path="history">
            <Route index element={<History />} />
            <Route path=":coinslug" element={<HistoryCoinCom />} />
          </Route>

          {/* AdminReceiver */}
          <Route path="adminReceiver"></Route>

          {/* Earn */}
          <Route path="earn">
            <Route index element={<Earn />} />
            <Route path=":coinslug" element={<EarnCoin />} />
            <Route path="mining/:coinslug" element={<MinerConversion />} />
          </Route>

          {/* Wallets */}
          <Route path="wallet" element={<Wallet />} />
          <Route path="wallet-details" element={<WalletInfo />} />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </>
  )
);
