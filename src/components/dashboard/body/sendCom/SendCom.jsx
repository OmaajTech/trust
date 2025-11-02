import { useState } from "react";
import MultipleCoinFolder from "../../../../reuseableCom/multipleCoinFolder/MultipleCoinFolder";

const SendCom = () => {
  const [searchedSend, setSearchedSend] = useState("");

  return (
    <>
      <MultipleCoinFolder
        searchedSend={searchedSend}
        setSearchedSend={setSearchedSend}
        name="send"
      />
    </>
  );
};

export default SendCom;
