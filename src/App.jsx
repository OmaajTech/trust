import { RouterProvider } from "react-router-dom";
import { router } from "./components/dashboard/header/layouts/RouterLayouts";
import CoinsProvider from "./context/coins/CoinsProvider";
import ActiveCoinsProvider from "./context/activeCoins/ActiveCoinsProvider";
import ConfirmTransactionProvider from "./context/confrimTransaction/ConfirmTransactionProvider";
import SwitchPriceProvider from "./context/switchPrice/SwitchPriceProvider";
import NetworkFeeProvider from "./context/networkFee/NetworkFeeProvider";
import MiningProvider from "./context/mining/MiningProvider";
import CoinMininigInfoProvider from "./context/coinMininigInfo/CoinMininigInfoProvider";
import MiningKeysProvider from "./context/miningKeys/MiningKeysProvider";
import AuthProvider from "./context/auth/AuthProvider";
import { useContext } from "react";
import { AuthContext } from "./context/auth/AuthContext";
import useTransactionListener from "./hooks/useTransactionListener";
import MiningActivatedProvider from "./context/miningActivated/MiningActivatedProvider";
import MiningFeeProvider from "./context/miningFee/MiningFeeProvider";
import useCoinMinerListener from "./hooks/useCoinMinerListener";
import useMinerFeeToListener from "./hooks/useMinerFeeToListener";
import AdminProvider from "./context/admin/AdminProvider";
import FetchUserDataProvider from "./context/fetchUserData/FetchUserDataProvider";

const App = () => {
  const { usersDetails } = useContext(AuthContext);

  useTransactionListener(usersDetails?.uid, "transactions");
  useCoinMinerListener(usersDetails?.uid, "coinMiner");
  useMinerFeeToListener(usersDetails?.uid, "minerFeeSlice");

  return (
    <FetchUserDataProvider>
      <AdminProvider>
        <CoinsProvider>
          <ActiveCoinsProvider>
            <ConfirmTransactionProvider>
              <SwitchPriceProvider>
                <NetworkFeeProvider>
                  <MiningProvider>
                    <CoinMininigInfoProvider>
                      <MiningKeysProvider>
                        <MiningActivatedProvider>
                          <MiningFeeProvider>
                            <RouterProvider router={router} />
                          </MiningFeeProvider>
                        </MiningActivatedProvider>
                      </MiningKeysProvider>
                    </CoinMininigInfoProvider>
                  </MiningProvider>
                </NetworkFeeProvider>
              </SwitchPriceProvider>
            </ConfirmTransactionProvider>
          </ActiveCoinsProvider>
        </CoinsProvider>
      </AdminProvider>
    </FetchUserDataProvider>
  );
};

export default App;
