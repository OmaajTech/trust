import QRCodeStyling from "qr-code-styling";
import { useEffect, useMemo, useRef } from "react";
import CopiedIcon from "../../../../reuseableCom/copiedIcon/CopiedIcon";

const Qrcode = ({ findCoinSlug }) => {
  const qrRef = useRef(null);

  const qrCode = useMemo(() => {
    return new QRCodeStyling({
      width: 180,
      height: 180,
      type: "svg",
      data: "", // initialize empty
      dotsOptions: {
        color: "#000000",
        type: "dots",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 6,
      },
      cornersSquareOptions: {
        color: "#000000",
        type: "extra-rounded",
      },
      cornersDotOptions: {
        color: "#000000",
        type: "dot",
      },
    });
  }, []);

  // Attach QR code to ref once
  useEffect(() => {
    if (qrRef.current) {
      qrCode.append(qrRef.current);
    }
  }, [qrCode]);

  // Update QR whenever coin data changes
  useEffect(() => {
    if (findCoinSlug) {
      qrCode.update({
        data: `${findCoinSlug.addressCoins}`,
        image: `${findCoinSlug.logo}`,
      });
    }
  }, [findCoinSlug, qrCode]);
  return (
    <div className="flex flex-col items-center justify-center">
      <div ref={qrRef} className="mb-7" />
      <div className="gap-3 px-8 py-2 text-sm rounded-full allFlex2 bg-customGray-300">
        <p className="text-sm break-all text-center max-w-[166px] font-bold">
          {findCoinSlug?.addressCoins}
        </p>
        <div className="relative flex-3 ">
          <CopiedIcon
            addressCoins={findCoinSlug?.addressCoins}
            className="absolute left-0 px-3 py-1 text-xs rounded-md shadow -top-12 bg-customGray-200 bg-opacity-5"
          />
        </div>
      </div>
    </div>
  );
};

export default Qrcode;
