import { useState } from "react";
import MultipleCoinFolder from "../../../../reuseableCom/multipleCoinFolder/MultipleCoinFolder";

const ReceivedCom = () => {
  const [searchedReceive, setSearchedReceive] = useState("");

  return (
    <>
      <MultipleCoinFolder
        searchedSend={searchedReceive}
        setSearchedSend={setSearchedReceive}
        name="receive"
      />
    </>
  );
};

export default ReceivedCom;
